import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';

export const styles = StyleSheet.create({
  txt_4: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.white,
  },
  txt_3: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.white,
  },
  txt_2: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.mediumGray,
  },
  txt_1: {
    lineHeight: 22,
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.white,
  },
  cnt_3: {
    padding: 16,
    height: '100%',
    justifyContent: 'space-between',
  },
  img_1: {
    height: '100%',
    width: '100%',
  },
  cnt_2: {
    height: '100%',
    width: '30%',
  },
  cnt_1: {
    flexDirection: 'row',
    height: 160,
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.medium,
  },

  linearGradient: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: fonts.bold,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
