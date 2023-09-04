import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';

export const styles = StyleSheet.create({
  name_txt: {
    paddingHorizontal: 16,
    fontFamily: fonts.medium,
    color: colors.lightRed,
    fontSize: 18,
  },
  container: {
    backgroundColor: colors.appBackground,
  },
  applyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  applyBtn: {
    flex: 2,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkRed,
    marginLeft: 20,
  },

  bottomBtns: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    shadowColor: colors.appBackground,
  },
});
