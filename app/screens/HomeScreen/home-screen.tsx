import React, {memo, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Keyboard, TextInput, View} from 'react-native';
import {
  Container,
  CustomText,
  CustomTouchableOpacity,
  FilterComponent,
  ImageView,
  StoreList,
} from '@components';
import {colors} from '@theme';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {styles} from './home-screen.styles';
import {cloneDeep} from 'lodash';
import {Icons} from '@assets';
import {Modalize} from 'react-native-modalize';
import {IsEmpty, updateCurrentFilter, uploadPendingImages} from '@utils';
import {
  getStoreData,
  selectHomeScreenSlice,
  selectLoginSlice,
  selectUploadSlice,
} from '@services';

interface HomeScreenProps {
  navigation: any;
  route: {
    params: any;
  };
}
export const HomeScreen: any = memo((props: HomeScreenProps) => {
  const dispatch = useDispatch<any>();
  const modalizeRef = useRef<Modalize>(null);
  const [searchText, setSearchText] = useState('');
  const {uid} = useSelector(selectLoginSlice, shallowEqual);
  const {storeList, currentFilter, filterOptions, loading} = useSelector(
    selectHomeScreenSlice,
    shallowEqual,
  );
  const {pendingImages} = useSelector(selectUploadSlice, shallowEqual);
  const [filteredStore, setFilteredStore] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(
    cloneDeep(currentFilter),
  );
  const getSetPendingImages = () => {
    if (!IsEmpty(pendingImages)) {
      uploadPendingImages(pendingImages, uid, dispatch);
    }
  };
  useEffect(() => {
    dispatch(getStoreData());
    getSetPendingImages();
  }, []);

  useEffect(() => {
    console.log('!!@@ check here', pendingImages);
  }, [pendingImages]);

  useEffect(() => {
    setFilteredStore(storeList);
  }, [storeList]);

  const applyFilter = (filter: any) => {
    setSearchText('');
    modalizeRef.current?.close();
    let res = updateCurrentFilter(filter, storeList);
    setFilteredStore(res);
  };

  const onPressSearchButton = () => {
    setFilteredStore(
      storeList.filter((store: any) => {
        const query = searchText.toLowerCase();
        return (
          (store?.data?.name?.toLowerCase?.() || '').includes(query) ||
          (store?.data?.area?.toLowerCase?.() || '').includes(query) ||
          (store?.data?.route?.toLowerCase?.() || '').includes(query) ||
          (store?.data?.type?.toLowerCase?.() || '').includes(query)
        );
      }),
    );
    Keyboard.dismiss();
  };

  const onPressFilter = () => {
    modalizeRef.current?.open();
  };

  return (
    <Container
      backgroundColor={colors.appBackground}
      containerStyle={styles.container}>
      <View style={styles.search_cnt}>
        <CustomText style={styles.title}>Retail Pulse</CustomText>
      </View>
      <View style={styles.txt_input_cnt}>
        <TextInput
          cursorColor={'#fff'}
          value={searchText}
          onChangeText={txt => setSearchText(txt)}
          placeholderTextColor={'#fff'}
          style={styles.txt_inp}
          placeholder="search store."
        />
        <CustomTouchableOpacity
          onPress={onPressSearchButton}
          style={styles.search_btn_cnt}>
          <View style={styles.search_btn_grd}>
            <CustomText style={styles.buttonText}>Search</CustomText>
          </View>
        </CustomTouchableOpacity>
      </View>
      {loading === 'idle' || loading === 'pending' ? (
        <View style={styles.loader_cnt}>
          <ActivityIndicator color={colors.lightRed} size={'large'} />
        </View>
      ) : (
        <StoreList storeData={filteredStore} />
      )}
      <CustomTouchableOpacity onPress={onPressFilter} style={styles.filter_cnt}>
        <ImageView
          tintColor={colors.white}
          source={Icons.filter}
          style={{width: 24, height: 24}}
        />
      </CustomTouchableOpacity>
      <Modalize
        adjustToContentHeight
        children={
          <FilterComponent
            filterOptions={filterOptions}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            applyFilter={applyFilter}
          />
        }
        ref={modalizeRef}
      />
    </Container>
  );
});
