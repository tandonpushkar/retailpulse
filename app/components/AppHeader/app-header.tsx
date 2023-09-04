import * as React from 'react';
import {Text, View} from 'react-native';
import {styles} from './app-header.styles';
import {Container, CustomTouchableOpacity, ImageView} from '@components';
import {navigationRef} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '@assets';

interface AppHeaderProps {
  title: string;
}

export const AppHeader = (props: AppHeaderProps) => {
  const {title} = props;
  const navigation = useNavigation();
  return (
    <CustomTouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}>
      <ImageView
        tintColor={'#fff'}
        source={Icons.back}
        style={{height: 20, width: 20}}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
    </CustomTouchableOpacity>
  );
};
