import {StyleSheet} from 'react-native';
import {colors, fonts} from '@theme';

export const styles = StyleSheet.create({
  brand_name: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand_title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  login_text: {
    fontWeight: 'bold',
    fontSize: 32,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  search_btn_grd: {
    backgroundColor: colors.darkRed,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    borderRadius: 20,
  },
  search_btn_cnt: {
    marginTop: 24,
    alignItems: 'center',
  },
  txt_inp: {
    width: '80%',
    fontSize: 14,
    fontFamily: fonts.medium,
    color: '#fff',
  },
  txt_input_cnt: {
    paddingLeft: 16,
    borderRadius: 20,
    height: 40,
    marginHorizontal: 16,
    backgroundColor: colors.mediumGray,
  },
  login_cnt: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.appBackground,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
