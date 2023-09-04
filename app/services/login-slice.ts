import {createSlice, createSelector} from '@reduxjs/toolkit';
import {ScreenNames, reducers} from '@constants';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

interface LoginSlice {
  loginResponse: {};
  uid: '';
}

export const postLogin = async (
  navigation: any,
  dispatch: any,
  email: any,
  password: any,
) => {
  try {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        dispatch(setLoginResponse(res));
        navigation.replace(ScreenNames.HOME);
      })
      .catch(error => {
        let errorMsg = 'Something went wrong. Please try again.';
        if (error.code === 'auth/invalid-email') {
          errorMsg = 'Please enter a valid email address.';
        } else if (
          ['auth/user-not-found', 'auth/wrong-password'].includes(error.code)
        ) {
          errorMsg = 'You have entered an invalid username or password.';
        } else if (error.code === 'auth/too-many-requests') {
          errorMsg =
            'You have exceed maximum number of requests. Please try again later.';
        } else if (error.code === 'auth/network-request-failed') {
          errorMsg = 'Please check your network connection and try again.';
        } else {
          errorMsg =
            'Something went wrong. Please try again. Error Code : ' +
            error.code;
        }
        Alert.alert('Login Error', errorMsg);
      })
      .finally(() => {});
  } catch (error) {
    console.warn('Error124', error);
  }
};

const initialState = {
  loginResponse: {},
  uid: '',
} as LoginSlice;

export const loginSlice = createSlice({
  name: reducers.LOGIN,
  initialState,
  reducers: {
    setLoginResponse(state, action) {
      state.loginResponse = action.payload;
      state.uid = action.payload?.user?.uid;
    },
  },
});

export const selectLoginSlice = createSelector(
  (state: any) => ({
    loginResponse: state[reducers.LOGIN].loginResponse,
    uid: state[reducers.LOGIN].uid,
  }),
  state => state,
);

export const {setLoginResponse} = loginSlice.actions;
