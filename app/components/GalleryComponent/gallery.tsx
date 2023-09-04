import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ImageView} from '../ImageView';
import {CustomText} from '../CustomNativeComponents';
import {selectUploadSlice} from '@services';
import {shallowEqual, useSelector} from 'react-redux';
import {styles} from './gallery.styles';
import {colors} from '@theme';
import ImageViewing from 'react-native-image-viewing';
export const Gallery = ({storeId}: any) => {
  const {uploadedImages} = useSelector(selectUploadSlice, shallowEqual);
  const [imageState, setImageState] = useState({
    modalVisible: false,
    index: 0,
  });
  const pendingImagesCount = useSelector(
    (state: any) =>
      Object.keys(state.upload?.pendingImages?.[storeId] ?? {}).length,
  );
  console.log(pendingImagesCount);
  const renderImageItem = ({item, index}: any) => (
    <TouchableOpacity
      style={styles.img_cnt}
      onPress={() => handleImagePress(item, index)}>
      <ImageView
        resizeMode={'contain'}
        source={{uri: item.uri}}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  const handleImagePress = (image: any, index: any) => {
    setImageState({
      modalVisible: true,
      index: index,
    });
    console.log('!!@@ image', image);
    // Handle image press (e.g., open a modal with the full-size image)
    // Implement your logic here
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.upload_txt}>Uploaded Images</CustomText>

      <FlatList
        ListEmptyComponent={() =>
          pendingImagesCount <= 0 ? (
            <View>
              <CustomText style={styles.no_upload_txt}>
                No Image Uploaded
              </CustomText>
            </View>
          ) : null
        }
        contentContainerStyle={styles.cnt_list}
        data={uploadedImages}
        renderItem={renderImageItem}
        keyExtractor={item => item.id}
        //numColumns={3} // Adjust the number of columns as needed
        ListFooterComponent={
          pendingImagesCount > 0 ? (
            <TouchableOpacity style={styles.img_cnt}>
              <ActivityIndicator size={'large'} color={colors.purple} />
            </TouchableOpacity>
          ) : null
        }
      />
      <ImageViewing
        images={uploadedImages}
        imageIndex={imageState.index}
        visible={imageState.modalVisible}
        onRequestClose={() =>
          setImageState({
            modalVisible: false,
            index: 0,
          })
        }
      />
    </View>
  );
};
