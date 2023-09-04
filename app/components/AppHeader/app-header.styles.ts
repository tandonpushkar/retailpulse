import {colors, fonts} from '@theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 15,
    padding: 15,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 18,
    paddingHorizontal: 10,
  },
});
