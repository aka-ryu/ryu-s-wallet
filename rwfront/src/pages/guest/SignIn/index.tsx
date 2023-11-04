import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './style';
import Header from '../../../components/Header/header';
import RyusInput from '../../../components/RyusInput/ryusInput';
import RyusButton from '../../../components/RyusButton/ryusButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Routes from '../../../navigation/Routes';
import {RootStackParamList} from '../../../interface/navigation';
import {useState} from 'react';

const SignIn = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={style.Container}>
      <Header goBack={false}></Header>
      <ScrollView style={style.content} showsVerticalScrollIndicator={false}>
        <View style={style.textLayer}>
          <Text style={style.text}>Welcome !!</Text>
          <Text style={style.text}>Hello, BlockChain Wallet</Text>
        </View>
        <View style={style.inputLayer}>
          <RyusInput placeholder={'이메일 아이디'} value={email}></RyusInput>
          <RyusInput
            placeholder={'비밀번호'}
            password={true}
            value={password}></RyusInput>
        </View>
        <View style={style.buttonLayer}>
          <RyusButton text="로그인"></RyusButton>
          <RyusButton
            text="카카오톡으로 시작하기"
            marginTop={5}
            buttonColor={'#FEE500'}
            textColor={'#191919'}></RyusButton>
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