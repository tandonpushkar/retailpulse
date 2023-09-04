import React, {memo, useEffect} from 'react';
import {Alert, Linking, ScrollView, Text, View} from 'react-native';
import {
  AppHeader,
  Container,
  CustomText,
  CustomTouchableOpacity,
  Gallery,
} from '@components';
import {colors, fonts} from '@theme';
import ImagePicker from 'react-native-image-crop-picker';
import * as RNFS from 'react-native-fs';
import {styles} from './upload-screen.styles';
import {useDispatch} from 'react-redux';
import {getUploadedImagesForStore, processImagesQueue} from '@services';

interface UploadScreenProps {
  navigation: any;
  route: {
    params: any;
  };
}
export const UploadScreen: any = memo((props: UploadScreenProps) => {
  const dispatch: any = useDispatch();
  let storeItem = props?.route?.params?.storeItem || {};
  let storeId = props?.route?.params?.storeId || '';

  const {name = ''} = storeItem;

  const copyAssests = (uri: any) => {
    //copy image to data directory for background upload across sessions
    // uri = isIOS ? decodeURIComponent(uri) : uri;
    const imagePath = `${
      RNFS.DocumentDirectoryPath
    }/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
    RNFS.copyFile(uri, imagePath)
      .then(() => {
        dispatch(
          processImagesQueue({
            imageObj: {
              storeId: storeId,
              imageLocalUri: imagePath,
              timestamp: Date.now(),
            },
            isDelete: false,
          }),
        );
      })
      .catch(err => console.error(err));
  };

  const onUpload = () => {
    try {
      ImagePicker.openCamera({
        cropping: true,
        multiple: true,
        compressImageQuality: 0.4,
      })
        .then((image: any) => {
          if (image?.path) {
            copyAssests(image.path);
          }
        })
        .catch((err: any) => {
          if (err.message.includes('User cancelled image selection')) {
            return;
          }
          let errMsg;
          if (err.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
            errMsg =
              'Camera is not available on this device. Please use some other device.';
          } else if (err.code === 'E_NO_CAMERA_PERMISSION') {
            Alert.alert(
              'Permission Required',
              'Camera permission is required to click pictures. Please grant permission in settings.',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Open Settings', onPress: Linking.openSettings},
              ],
              {cancelable: false},
            );
          } else {
            errMsg = 'Something went wrong, please try again.';
          }
          if (errMsg) {
            Alert.alert('Error', errMsg);
          }
        });
    } catch (err) {}
  };

  useEffect(() => {
    dispatch(getUploadedImagesForStore(storeId));
  }, []);

  return (
    <Container
      backgroundColor={colors.appBackground}
      containerStyle={styles.container}>
      <AppHeader title={'back'} />
      <CustomText style={styles.name_txt}>{name}</CustomText>
      <Gallery storeId={storeId} />
      <View style={styles.bottomBtns}>
        <CustomTouchableOpacity onPress={onUpload} style={styles.applyBtn}>
          <CustomText style={styles.applyText}>Upload</CustomText>
        </CustomTouchableOpacity>
      </View>
    </Container>
  );
});
