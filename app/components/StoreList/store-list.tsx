import React, {memo} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {CustomText, StoreSnippet} from '@components';
import {FlashList} from '@shopify/flash-list';
import {styles} from './store-list.styles';
import {KeyExtractor, removeClippedSubviews} from '@utils';

export const StoreList: any = memo(
  ({storeData, heading = 'Store List'}: any) => {
    const renderListItem = ({item, index}: any) => {
      return (
        <StoreSnippet
          key={index?.toString() + 'k'}
          storeId={item?.id}
          item={item?.data}
        />
      );
    };

    return (
      <View>
        <View style={styles.heading_cnt}>
          <CustomText style={styles.title}>{heading}</CustomText>
        </View>
        <View style={styles.list_top}>
          <View style={styles.item_separator} />
          <FlashList
            getItemType={(item: any) => {
              return item?.id;
            }}
            removeClippedSubviews={removeClippedSubviews}
            keyExtractor={KeyExtractor}
            contentContainerStyle={styles.list_cnt}
            estimatedItemSize={200}
            data={storeData}
            ItemSeparatorComponent={() => (
              <View style={styles.item_separator} />
            )}
            renderItem={renderListItem}
          />
        </View>
      </View>
    );
  },
);
