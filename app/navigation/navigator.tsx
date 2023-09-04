import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ErrorBoundaryScreen} from '@utils';
import {navigationRef} from '@navigation';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '@theme';
import {MainStack} from './routes';

const Navigator = () => {
  return (
    <NavigationContainer
      fallback={
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={colors.black} size={'small'} />
        </View>
      }
      //ref={navigationRef}
      onReady={() => {
        // routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      // onStateChange={async () => {
      //   const previousRouteName = routeNameRef.current;
      //   const currentRouteName = navigationRef.current.getCurrentRoute().name;

      //   if (previousRouteName !== currentRouteName) {
      //     await analytics().logScreenView({
      //       screen_name: currentRouteName,
      //       screen_class: currentRouteName,
      //     });
      //   }
      //   routeNameRef.current = currentRouteName;
      // }}
    >
      <ErrorBoundaryScreen catchErrors="always">
        {/* <View /> */}
        <MainStack />
      </ErrorBoundaryScreen>
    </NavigationContainer>
  );
};

export default Navigator;
