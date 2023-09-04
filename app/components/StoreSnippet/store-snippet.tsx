import React, {memo} from 'react';
import {View} from 'react-native';
import {CustomText, CustomTouchableOpacity} from '@components';
import {styles} from './store-snippet.styles';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '@constants';
import {colors} from '@theme';

export const StoreSnippet: any = memo(({storeId, item}: any) => {
  const navigation: any = useNavigation();
  const onPressSnippet = () => {
    navigation.navigate(ScreenNames.UPLOAD, {
      storeId: storeId,
      storeItem: item,
    });
  };

  return (
    <CustomTouchableOpacity onPress={onPressSnippet} style={styles.cnt_1}>
      <View style={styles.cnt_3}>
        <View style={{rowGap: 4}}>
          <CustomText numberOfLines={2} style={styles.txt_1}>
            {item?.name}
          </CustomText>
          <CustomText numberOfLines={2} style={styles.txt_3}>
            Address{'  '}
            <CustomText style={styles.txt_2}>{item?.address}</CustomText>
          </CustomText>

          <CustomText style={styles.txt_3}>
            Area{'  '}
            <CustomText style={[styles.txt_2, {color: colors.lightRed}]}>
              {item?.area}
            </CustomText>
          </CustomText>
          <CustomText style={styles.txt_3}>
            Route{'  '}
            <CustomText style={[styles.txt_2, {color: colors.purple}]}>
              {item?.route}
            </CustomText>
          </CustomText>
          <CustomText style={styles.txt_3}>
            Type{'  '}
            <CustomText style={[styles.txt_2, {color: colors.lightGray}]}>
              {item?.type}
            </CustomText>
          </CustomText>
        </View>
      </View>
    </CustomTouchableOpacity>
  );
});
