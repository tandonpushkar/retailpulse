import {colors, fonts} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cnt_list: {
    flexWrap: 'wrap',
    //justifyContent: 'center',
    flexDirection: 'row',
    // width: 345,
    marginHorizontal: 8,
    alignItems: 'center',
    rowGap: 16,
  },
  img_cnt: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: colors.white,
    width: 100,
    height: 100,
  },
  upload_txt: {
    padding: 16,
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.white,
  },
  no_upload_txt: {
    fontFamily: fonts.medium,
    color: colors.lightGray,
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
});
