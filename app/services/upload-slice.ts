import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit';
import {reducers} from '@constants';
import storage from '@react-native-firebase/storage';
import {addToStoreVisitNode} from '@utils';
import firestore from '@react-native-firebase/firestore';
import {omit} from 'lodash';
import * as RNFS from 'react-native-fs';
interface UploadSlice {
  pendingImages: {};
  uploadedImages: {};
}

const uploadTaskPromise: any = (
  imageLocalPath: any,
  imagePathFirebaseStorage: any,
) => {
  const fileUploading = () =>
    new Promise(resolve => {
      const onFail = (err: any) => {
        console.error(err);
        return resolve(null);
      };
      try {
        const reference = storage().ref(imagePathFirebaseStorage);
        const task = reference.putFile(imageLocalPath);
        task
          .then(() => {
            reference.getDownloadURL().then(resolve).catch(onFail);
          })
          .catch(onFail);
      } catch (err) {
        return onFail(err);
      }
    });
  return fileUploading();
};

export const getUploadedImagesForStore = createAsyncThunk(
  `${reducers.UPLOAD}/getUploadedImagesForStore`,
  async (storeId: any, {dispatch, getState, rejectWithValue}: any) => {
    try {
      const uid = getState()?.login?.loginResponse?.user?.uid;
      const onError = () => {};
      const onResult = (snapshot: any) => {
        try {
          const uploadedImages: any = {};
          snapshot.docs.forEach((doc: any) => {
            try {
              uploadedImages[doc.id] = doc.data();
            } catch (e) {
              console.log(e);
            }
          });
          dispatch(setUploadedImages(uploadedImages?.[storeId]?.[uid]));
        } catch (err) {
          console.log(err);
        }
      };

      firestore().collection('store-visit').onSnapshot(onResult, onError);
    } catch (err) {
      console.log('!!@@ chck', err);
    }
  },
);

export const startUploading = (imageObj: any, uid: any, dispatch: any) =>
  uploadTaskPromise(
    imageObj.imageLocalUri,
    `images/${imageObj.storeId}/${uid}_${imageObj.timestamp}_0`,
  ).then((imageUrl: any) => {
    if (imageUrl?.length) {
      addToStoreVisitNode(imageObj.storeId, uid, {
        uri: imageUrl,
        timestamp: imageObj.timestamp,
      }); //add to store visit node
      dispatch(
        processImagesQueue({
          imageObj: imageObj,
          isDelete: true,
        }),
      ); //remove from store
      RNFS.unlink(imageObj.imageLocalUri).catch(err => console.error(err)); //delete image
    }
  });

export const processImagesQueue = createAsyncThunk(
  `${reducers.UPLOAD}/processImagesQueue`,
  async (
    {
      imageObj = {storeId: '', imageLocalUri: '', timestamp: null},
      isDelete = false,
    }: any,
    {dispatch, getState}: any,
  ) => {
    try {
      const uid = getState()?.login?.loginResponse?.user?.uid;
      const pendingImages = getState()?.upload?.pendingImages;
      const updatedQueuedImages = {};

      if (isDelete) {
        const exist =
          pendingImages?.[imageObj.storeId]?.[imageObj?.imageLocalUri];

        if (exist) {
          if (Object.keys(pendingImages?.[imageObj?.storeId]).length === 1) {
            Object.assign(
              updatedQueuedImages,
              omit(pendingImages, imageObj?.storeId),
            );
          } else {
            Object.assign(updatedQueuedImages, {
              ...pendingImages,
              ...{
                [imageObj?.storeId]: omit(
                  pendingImages?.[imageObj?.storeId],
                  imageObj?.imageLocalUri,
                ),
              },
            });
          }
        } else {
          return;
        }
      } else {
        Object.assign(updatedQueuedImages, pendingImages, {
          [imageObj?.storeId]: {
            [imageObj?.imageLocalUri]: {
              timestamp: imageObj?.timestamp,
            },
            ...(pendingImages?.[imageObj.storeId] || {}),
          },
        });
        startUploading(imageObj, uid, dispatch);
      }
      dispatch(setPendingImages(updatedQueuedImages));
    } catch (err) {
      console.error('!!@@ chck', err);
    }
  },
);

const initialState = {
  pendingImages: {},
  uploadedImages: {},
} as UploadSlice;

export const uploadSlice = createSlice({
  name: reducers.UPLOAD,
  initialState,
  reducers: {
    setPendingImages(state, action) {
      state.pendingImages = action?.payload;
    },
    setUploadedImages(state, action) {
      state.uploadedImages = action.payload;
    },
  },
});

export const selectUploadSlice = createSelector(
  (state: any) => ({
    pendingImages: state[reducers.UPLOAD]?.pendingImages,
    uploadedImages: state[reducers.UPLOAD]?.uploadedImages,
  }),
  state => state,
);

export const {setPendingImages, setUploadedImages} = uploadSlice.actions;
