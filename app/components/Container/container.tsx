import * as React from 'react';
import {StatusBar, View, ViewStyle} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';

interface Props {
  children: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  backgroundColor?: any;
}
const CustomStatusBar = ({backgroundColor, ...props}: any) => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{height: StatusBar.currentHeight || top, backgroundColor}}>
      <SafeAreaView style={{backgroundColor}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
};

export const Container = (props: Props) => {
  return (
    <SafeAreaProvider>
      <CustomStatusBar
        barStyle={'light-content'}
        backgroundColor={
          props.backgroundColor ? props.backgroundColor : colors.white
        }
      />
      <SafeAreaView
        edges={['left', 'right', 'bottom']}
        style={[
          {flex: 1, backgroundColor: colors.white},
          props.containerStyle,
        ]}>
        {props.children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
