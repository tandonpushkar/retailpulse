import React, {memo, useState} from 'react';
import {ActivityIndicator, TextInput, View} from 'react-native';
import {Container, CustomText, CustomTouchableOpacity} from '@components';
import {colors} from '@theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {postLogin} from '@services';
import {styles} from './login-screen.styles';
interface LoginScreenProps {
  navigation: any;
  route: {
    params: any;
  };
}
export const LoginScreen: any = memo((props: LoginScreenProps) => {
  const dispatch = useDispatch<any>();
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDisabled = email?.length < 5 || password?.length < 5;
  const [loading, setLoading] = useState(false);

  const onPressLoginButton = async () => {
    setLoading(true);
    await postLogin(navigation, dispatch, email, password);
  };

  return (
    <Container
      backgroundColor={colors.appBackground}
      containerStyle={styles.container}>
      <View style={styles.brand_name}>
        <CustomText style={styles.brand_title}>Retail Pulse</CustomText>
      </View>
      <View style={styles.login_cnt}>
        <CustomText style={styles.login_text}>Login</CustomText>
      </View>

      <View style={{rowGap: 24}}>
        <View style={styles.txt_input_cnt}>
          <TextInput
            selectionColor={colors.white}
            value={email}
            onChangeText={txt => setEmail(txt)}
            placeholderTextColor={'#fff'}
            style={styles.txt_inp}
            placeholder="enter email."
          />
        </View>
        <View style={styles.txt_input_cnt}>
          <TextInput
            selectionColor={colors.white}
            value={password}
            onChangeText={txt => setPassword(txt)}
            placeholderTextColor={'#fff'}
            style={styles.txt_inp}
            placeholder="enter password."
          />
        </View>
      </View>

      <CustomTouchableOpacity
        disabled={isDisabled}
        onPress={onPressLoginButton}
        style={styles.search_btn_cnt}>
        <View style={styles.search_btn_grd}>
          {loading ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <CustomText style={styles.buttonText}>Login</CustomText>
          )}
        </View>
      </CustomTouchableOpacity>
    </Container>
  );
});
