import {SafeAreaView, Text, View} from 'react-native';
import style from './style';
import Header from '../../../components/Header/header';
import RyusInput from '../../../components/TextInput/ryusInput';

const Login = () => {
  return (
    <SafeAreaView style={style.Container}>
      <Header goBack={false}></Header>
      <View style={style.content}>
        <View style={style.textLayer}>
          <Text style={style.text}>Welcome !!</Text>
          <Text style={style.text}>Hello, BlockChain Wallet</Text>
        </View>
        <View style={style.inputLayer}>
          <RyusInput placeholder={'Email'}></RyusInput>
          <RyusInput placeholder={'Password'}></RyusInput>
          <Text>gd</Text>
        </View>

        <View style={style.buttonLayer}></View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
