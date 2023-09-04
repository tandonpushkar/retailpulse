import {StyleSheet} from 'react-native';
import {colors} from '@theme';

export const styles = StyleSheet.create({
  list_cnt: {
    paddingBottom: 50,
  },
  item_separator: {
    height: 6,
    backgroundColor: colors.black,
  },
  heading_cnt: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 20,
    color: colors.white,
    fontFamily: 'Baloo2-Medium',
  },
  list_top: {height: '90%'},
});
