import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import styles from './index.styles';
import {colors} from '@theme';
import {Container} from '@components';
interface Props {
  navigation: any;
  route: any;
}

const ERRORS: any = {
  404: {
    color: '#d24d57',
    description: 'Someone is so lost.',
    subDescription:
      'Unfortunately the page you were looking for could not be found. It may be temporarily unavailable, moved or no longer exists.',
  },
  500: {
    color: '#fff',
    description: 'Oops Something went wrong.',
    subDescription: 'We are working on getting this fixed as soon as we can.',
  },
};
export const ErrorScreenComponent = ({error, resetError, statusCode}: any) => {
  return (
    <>
      <Container>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          {/* <View style={styles.imageContainer}>
            <Image style={styles.image} source={Images.carimage1} />
          </View> */}
          <View>
            <Text style={styles.description}>
              {ERRORS[statusCode].description}
            </Text>
            <Text style={styles.subDescription}>
              {ERRORS[statusCode].subDescription}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 5,
              backgroundColor: colors.mediumGray,
            }}
            onPress={resetError}
            activeOpacity={0.2}>
            <Text
              style={[
                styles.button,
                {
                  fontWeight: '700',
                  color: 'white',
                },
              ]}>
              Home
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Container>
    </>
  );
};
