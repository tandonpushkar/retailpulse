import {Dimensions, PixelRatio, Platform} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {filter, forOwn, orderBy} from 'lodash';
import {startUploading} from '@services';

export const FILTER_KEYS = ['type', 'area', 'route'];
export const ALL_KEY = 'All';

export const getDefaultFilter = () => {
  const obj: any = {};
  FILTER_KEYS.forEach(key => {
    obj[key] = [ALL_KEY];
  });
  return obj;
};

export const getFilterOptions = (storesArray: any) => {
  try {
    const options: any = {};
    FILTER_KEYS.forEach(key => {
      options[key] = new Set();
    });
    storesArray.forEach((storeObj: any) => {
      const {data} = storeObj;
      FILTER_KEYS.forEach(key => {
        if (data?.[key]) {
          options[key].add(data[key]);
        }
      });
    });
    const filterOptions: any = {};
    forOwn(options, (value, key) => {
      filterOptions[key] = orderBy(Array.from(value), val =>
        `${val}`?.toLowerCase?.(),
      );
    });

    return filterOptions;
  } catch (err) {
    console.log(err);
  }
};

export const updateCurrentFilter = (filter: any, stores: any) => {
  try {
    const filteredStore = stores.filter(({data}: any) =>
      FILTER_KEYS.every(key => {
        if (filter[key].length === 1 && filter[key][0] === ALL_KEY) {
          return true;
        } else
          return filter[key].some(
            (filteredVal: any) => data[key] === filteredVal,
          );
      }),
    );
    return filteredStore;
  } catch (err) {
    console.log(err);
  }
};

export const getUserData = (uid: any) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject('No such document!');
        }
      })
      .catch(reject);
  });
};

export const getStoresDetail = async (storeIds: any) => {
  const data: any = [];
  const promiseArr: any = [];
  const end =
    storeIds?.length % 10 === 0
      ? storeIds?.length
      : (parseInt(storeIds?.length / 10) + 1) * 10; //runding to next 10's multiple
  for (let i = 0; i < end; i += 10) {
    //batch of 10
    const handlePromise = () =>
      fetchTenDocs(storeIds.slice(i, i + 10), 'stores')
        .then(res => {
          if (res?.length) {
            data.push(...res);
          }
        })
        .catch(err => console.log(err));
    promiseArr.push(handlePromise);
  }
  return Promise.all(promiseArr.map(fn => fn()))
    .then(() => data)
    .catch(err => console.log(err));
};

export const fetchTenDocs = (docArray: any, collection: any) => {
  return firestore()
    .collection(collection)
    .where('__name__', 'in', docArray)
    .get()
    .then(res => {
      const data: any = [];
      res.forEach(doc => {
        if (doc.exists) {
          const info = doc.data();
          data.push({
            id: doc.id,
            data: Object.assign({}, info, {
              name: info?.name?.substring(3) || '',
            }),
          });
        }
      });
      return data;
    })
    .catch(e => {
      console.log(e);
      return [];
    });
};

export const addToStoreVisitNode = (storeId: any, uid: any, updateObj: any) => {
  firestore()
    .collection('store-visit')
    .doc(storeId)
    .set({[uid]: firestore.FieldValue.arrayUnion(updateObj)}, {merge: true});
};

export const uploadPendingImages = (
  pendingImages: any,
  uid: any,
  dispatch: any,
) => {
  if (!IsEmpty(pendingImages)) {
    forOwn(pendingImages, (storeImages, storeId) => {
      forOwn(storeImages, (imageObj, imageLocalUri) => {
        startUploading(
          {
            ...imageObj,
            storeId,
            imageLocalUri,
          },
          uid,
          dispatch,
        );
      });
    });
  }
};

export const removeClippedSubviews = Platform.OS === 'ios' ? false : true;
export const KeyExtractor: any = (item: any, index: number) =>
  'key' + index?.toString();
export const getRandomInt = (max: any) => {
  return Math.floor(Math.random() * max);
};

const {width, height} = Dimensions.get('window');

export {width, height};

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const pixelRatio = PixelRatio.getFontScale();
export const deviceWidth = Dimensions.get('screen').width;
export const deviceHeight = Dimensions.get('window').height;

export const ifNotValid = (value: any) => value == undefined || value == null;

export const ifValid = (value: any) => value != undefined && value != null;

export const ifValidNLenZ = (value: any) =>
  value != undefined && value != null && value.length === 0;

export const ifGreaterArray = (value: any) =>
  value != undefined && value != null && value.length > 0;

export const ifEmpty = (value: any) =>
  value != undefined && value != null && value == '';

export const ifNotEmpty = (value: any) =>
  value != undefined && value != null && value != '';

export const ifNValidObj = (value: any) =>
  value == undefined || value == null ? {} : value;

export const IsEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);
