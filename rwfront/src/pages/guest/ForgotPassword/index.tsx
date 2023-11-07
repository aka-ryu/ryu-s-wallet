import {Alert, SafeAreaView, ScrollView, Text, View} from 'react-native';
import style from './style';
import Header from '../../../components/Header';
import RyusButton from '../../../components/RyusButton/index.tsx';
import RyusInput from '../../../components/RyusInput';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import Api from '../../../components/Api';
import {RootStackParamList} from '../../../interface/navigation';
import Routes from '../../../navigation/Routes';
import {emailRegex, codeRegex} from '../../../interface/regex';

const ForgotPassword = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
  const [verifyButtonDisabled, setVerifyButtonDisabled] = useState(true);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [codeSendLoading, setCodeSendLoading] = useState(false);
  const [codeCheckLoading, setCodeCheckLoading] = useState(false);

  const [authenticating, setAuthenticating] = useState(false);

  const [failCount, setFailCount] = useState(0);

  const [nextStep, setNextStep] = useState(true);

  useEffect(() => {
    setSendButtonDisabled(!emailRegex.test(String(email).toLowerCase()));
  }, [email]);

  useEffect(() => {
    setVerifyButtonDisabled(!codeRegex.test(code));
  }, [code]);

  const handleEditEmail = () => {
    setEmail('');
    setCode('');
    setAuthenticating(false);
    setSendButtonDisabled(true);
    setCodeSendLoading(false);
  };

  const handleSendVerfiyCode = async () => {
    setSendButtonDisabled(true);
    setCodeSendLoading(true);
    try {
      const response = await Api.sendEmailVerfyCode({
        email: email,
        type: 'password',
      });
      if (response.result === 'success') {
        setCodeSendLoading(false);
        setAuthenticating(true);
      } else {
        setSendButtonDisabled(false);
      }

      Alert.alert(response.message);
    } catch (error) {}
    setCodeSendLoading(false);
  };

  const handleCheckCode = async () => {
    setVerifyButtonDisabled(true);
    setCodeCheckLoading(true);
    try {
      const response = await Api.checkEmailCode({
        code: code,
        email: email,
        type: 'password',
      });
      console.log(response);
      if (response.result === 'success') {
        setCodeCheckLoading(false);
        setNextStep(false);
        Alert.alert(response.message);
        navigation.navigate(Routes.SIGN_IN);
      } else {
        setVerifyButtonDisabled(false);
        setCodeCheckLoading(false);
        if (
          response.message ===
          '인증시간 10분이 초과하였습니다, 다시 시도해 주세요.'
        ) {
          handleEditEmail();
          Alert.alert(response.message);
        } else if (response.message === '인증번호가 틀립니다.') {
          setFailCount(failCount + 1);
          if (failCount > 4) {
            handleEditEmail();
            setFailCount(0);
            Alert.alert('5회 실패하셨습니다. 다시 시도해주세요.');
          } else {
            Alert.alert(response.message);
          }
        }
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView style={style.Container}>
      <Header goBack={true} title={'Find Info'}></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.inputLayer}>
          <View>
            <RyusInput
              label={'이메일 아이디'}
              onChangeText={text => {
                setEmail(text);
              }}
              value={email}
              readonly={!authenticating}></RyusInput>
            <RyusButton
              text="인증번호 발송"
              disabled={sendButtonDisabled}
              onPress={handleSendVerfiyCode}
              loading={codeSendLoading}></RyusButton>
          </View>
          {authenticating && (
            <View style={{marginTop: 30}}>
              <RyusInput
                label={'인증번호'}
                value={code}
                placeholder={'숫자로만 6글자'}
                maxLength={6}
                readonly={nextStep}
                onChangeText={text => {
                  setCode(text);
                }}></RyusInput>

              <RyusButton
                text="인증번호 확인"
                marginTop={5}
                disabled={verifyButtonDisabled}
                onPress={handleCheckCode}
                loading={codeCheckLoading}></RyusButton>
            </View>
          )}

          <View style={{height: 30}}></View>
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
