import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';

export const styles = StyleSheet.create({
  categoryView: {
    marginVertical: 10,
  },
  categoryHeading: {
    color: colors.white,
    textTransform: 'capitalize',
    fontWeight: '600',
    fontFamily: fonts.bold,
    fontSize: 20,
    marginBottom: 5,
  },
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resetText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black + '80',
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
  resetBtn: {
    flex: 1,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mediumGray,
  },
  bottomBtns: {
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
  optionsBtn: {
    marginRight: 10,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  optionsText: {
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: '300',
  },
});
