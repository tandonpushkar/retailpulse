import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {ScreenNames} from '@constants';
import {HomeScreen, LoginScreen, UploadScreen} from '@screens';
import {screenOption} from '@constants';
import {store} from '../redux/store/index';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  const {login: {loginResponse = {}} = {}} = store?.getState();

  return (
    <Stack.Navigator
      initialRouteName={
        loginResponse?.user?.uid ? ScreenNames.HOME : ScreenNames.LOGIN
      }
      screenOptions={screenOption}>
      <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ScreenNames.HOME} component={HomeScreen} />
      <Stack.Screen name={ScreenNames.UPLOAD} component={UploadScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
