import React, {memo} from 'react';
import {colors} from '@theme';
import {View, ScrollView, Text} from 'react-native';
import {CustomText, CustomTouchableOpacity} from '@components';
import {ALL_KEY, FILTER_KEYS, IsEmpty, getDefaultFilter} from '@utils';
import {styles} from './filter.styles';

export const FilterComponent = memo(
  ({filterOptions, setSelectedFilters, selectedFilters, applyFilter}: any) => {
    const onItemPress = (categoryName: any, item: any) => {
      setSelectedFilters((prev: any) => {
        const prevValues = prev[categoryName];
        const prevIndex = prevValues.findIndex((vals: any) => item === vals);
        const isPrevIncluded = prevIndex > -1;
        if (
          item === ALL_KEY ||
          (!isPrevIncluded &&
            prevValues.length === filterOptions[categoryName].length - 1)
        ) {
          return {
            ...prev,
            [categoryName]: [ALL_KEY],
          };
        } else if (prevValues.length === 1 && prevValues[0] === ALL_KEY) {
          return {
            ...prev,
            [categoryName]: [item],
          };
        } else if (isPrevIncluded) {
          prevValues.splice(prevIndex, 1);
          return {
            ...prev,
            [categoryName]: !prevValues.length ? [ALL_KEY] : prevValues,
          };
        } else {
          return {
            ...prev,
            [categoryName]: [...prevValues, item],
          };
        }
      });
    };

    return (
      <View
        style={{
          padding: 16,
          backgroundColor: colors.appBackground,
          height: 500,
        }}>
        {!IsEmpty(filterOptions) ? (
          <ScrollView>
            {FILTER_KEYS.map((name, idx) => {
              return (
                <View key={`${name}_${idx}`} style={styles.categoryView}>
                  <Text style={styles.categoryHeading}>{name}</Text>
                  <View style={styles.categoryOptions}>
                    {[ALL_KEY, ...filterOptions[name]].map((option, index) => {
                      const isSelected = selectedFilters[name].includes(option);
                      return (
                        <CustomTouchableOpacity
                          key={`${name}_${option}_${index}`}
                          onPress={() => onItemPress(name, option)}
                          style={[
                            styles.optionsBtn,
                            {
                              backgroundColor: isSelected
                                ? colors.darkRed
                                : colors.appBackground,
                              borderColor: isSelected
                                ? colors.lightGray
                                : colors.appBackground,
                            },
                          ]}>
                          <Text
                            style={[
                              styles.optionsText,
                              {
                                color: isSelected
                                  ? colors.lightGray
                                  : colors.lightGray,
                              },
                            ]}>
                            {option}
                          </Text>
                        </CustomTouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : null}

        <View style={styles.bottomBtns}>
          <CustomTouchableOpacity
            style={styles.resetBtn}
            onPress={() => setSelectedFilters(getDefaultFilter())}>
            <Text style={styles.resetText}>{'Reset'}</Text>
          </CustomTouchableOpacity>
          <CustomTouchableOpacity
            onPress={() => applyFilter(selectedFilters)}
            style={styles.applyBtn}>
            <CustomText style={styles.applyText}>Apply</CustomText>
          </CustomTouchableOpacity>
        </View>
      </View>
    );
  },
);
