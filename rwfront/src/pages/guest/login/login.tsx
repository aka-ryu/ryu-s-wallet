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

const Login = () => {
  return (
    <SafeAreaView style={style.Container}>
      <Header goBack={false}></Header>
      <ScrollView style={style.content}>
        <View style={style.textLayer}>
          <Text style={style.text}>Welcome !!</Text>
          <Text style={style.text}>Hello, BlockChain Wallet</Text>
        </View>
        <View style={style.inputLayer}>
          <RyusInput placeholder={'Email'}></RyusInput>
          <RyusInput placeholder={'Password'} password={true}></RyusInput>
        </View>

        <View style={style.buttonLayer}>
          <RyusButton text="Login"></RyusButton>
          <View style={style.textButtonLayer}>
            <TouchableOpacity style={style.textButtonSizs}>
              <Text style={style.textButtonStyle}>Join Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.textButtonSizs}>
              <Text style={[style.textButtonStyle, {textAlign: 'right'}]}>
                Forgot Info ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
