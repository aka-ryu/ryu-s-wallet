import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './style';
import Header from '../../../components/Header';
import RyusInput from '../../../components/RyusInput';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import Routes from '../../../navigation/Routes';
import {RootStackParamList} from '../../../interface/navigation';
import React, {useEffect, useState} from 'react';
import {emailRegex} from '../../../interface/regex';
import Api from '../../../components/Api';
import {useDispatch} from 'react-redux';
import {useTypedSelector} from '../../../redux/store';
import {login} from '../../../redux/slices/userSlice';
import RyusButton from '../../../components/RyusButton';

const SignIn = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const userState = useTypedSelector(state => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [loginButtonLoading, setLoginButtonLoading] = useState(false);

  // 페이지 진입시 모든상태 초기화
  const isFocused = useIsFocused();
  useEffect(() => {
    setEmail('');
    setPassword('');
    setLoginButtonDisabled(true);
    setLoginButtonLoading(false);
  }, [isFocused]);

  useEffect(() => {
    setLoginButtonDisabled(
      !(emailRegex.test(String(email).toLowerCase()) && password.length > 7),
    );
  }, [email, password]);

  const handleSignIn = async () => {
    console.log(userState);
    try {
      setLoginButtonLoading(true);
      setLoginButtonDisabled(true);

      const response = await Api.signIn({email: email, password: password});

      if (response.result === 'success') {
        dispatch(
          login({
            email: email,
            token: response.data.token,
            is_wallet: response.data.is_wallet,
          }),
        );

        // if (userState.is_wallet) {
        //   navigation.navigate(Routes.HOME);
        // } else {
        //   navigation.navigate(Routes.GET_WALLET);
        // }
      } else {
        setLoginButtonLoading(false);
        setLoginButtonDisabled(false);
        Alert.alert(response.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('서버에 문제가 발생하였습니다.');
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false}></Header>
      <ScrollView style={style.content} showsVerticalScrollIndicator={false}>
        <View style={style.textLayer}>
          <Text style={style.text}>Welcome !!</Text>
          <Text style={style.text}>Hello, BlockChain Wallet</Text>
        </View>
        <View style={style.inputLayer}>
          <RyusInput
            placeholder={'이메일 아이디'}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}></RyusInput>
          <RyusInput
            placeholder={'비밀번호'}
            onChangeText={text => {
              setPassword(text);
            }}
            password={true}
            value={password}></RyusInput>
        </View>
        <View style={style.buttonLayer}>
          <View style={{height: 60}}></View>
          <RyusButton
            text="로그인"
            disabled={loginButtonDisabled}
            loading={loginButtonLoading}
            onPress={handleSignIn}></RyusButton>
          <View style={style.textButtonLayer}>
            <TouchableOpacity
              style={style.textButtonSizs}
              onPress={() => navigation.navigate(Routes.SIGN_UP)}>
              <Text style={style.textButtonStyle}>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.textButtonSizs}
              onPress={() => navigation.navigate(Routes.FORGOT_PASSWORD)}>
              <Text style={[style.textButtonStyle, {textAlign: 'right'}]}>
                비밀번호 찾기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
