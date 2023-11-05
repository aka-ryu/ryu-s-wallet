import {Alert, ScrollView, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header/header';
import style from './style';
import RyusInput from '../../../components/RyusInput/ryusInput';
import RyusButton from '../../../components/RyusButton/ryusButton';
import {useEffect, useState} from 'react';
import React from 'react';
import Api from '../../../components/Api';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../interface/navigation';
import Routes from '../../../navigation/Routes';

const SignUp = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
  const [verifyButtonDisabled, setVerifyButtonDisabled] = useState(true);
  const [signButtonDisabled, setSignButtonDisabled] = useState(true);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [codeSendLoading, setCodeSendLoading] = useState(false);
  const [codeCheckLoading, setCodeCheckLoading] = useState(false);
  const [signUpButtonLoading, setSignUpButtonLoading] = useState(false);

  const [authenticating, setAuthenticating] = useState(false);

  const [failCount, setFailCount] = useState(0);

  const [nextStep, setNextStep] = useState(true);

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const codeRegex = /^\d{6}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  useEffect(() => {
    setSendButtonDisabled(!emailRegex.test(String(email).toLowerCase()));
  }, [email]);

  useEffect(() => {
    setVerifyButtonDisabled(!codeRegex.test(code));
  }, [code]);

  useEffect(() => {
    handleCheckPassword();
  }, [password, confirmPassword]);

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
        type: 'signup',
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
        type: 'signup',
      });
      if (response.result === 'success') {
        setCodeCheckLoading(false);
        setNextStep(false);
        Alert.alert(response.message);
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

  const handleCheckPassword = () => {
    let isPasswordError = false;
    let isConfirmPasswordError = false;

    if (password === '') {
      setPasswordError('');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('영어 + 숫자 조합 8 ~ 20글자 입니다.');
      isPasswordError = true;
    } else {
      setPasswordError('');
    }

    if (confirmPassword === '') {
      setConfirmPasswordError('');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      isConfirmPasswordError = true;
    } else {
      setConfirmPasswordError('');
    }

    if (
      !isPasswordError &&
      !isConfirmPasswordError &&
      password &&
      confirmPassword
    ) {
      setSignButtonDisabled(false);
    } else {
      setSignButtonDisabled(true);
    }
  };

  const handleSignUp = async () => {
    setSignUpButtonLoading(true);
    setSignButtonDisabled(true);
    const response = await Api.signUp({email: email, password: password});

    Alert.alert(response.message);
    navigation.navigate(Routes.SIGN_IN);
  };
  return (
    <SafeAreaView style={style.Container}>
      <Header goBack={true} title={'Sign Up'}></Header>
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

              {nextStep && (
                <RyusButton
                  text="이메일 주소 수정"
                  onPress={handleEditEmail}></RyusButton>
              )}

              <RyusButton
                text="인증번호 확인"
                marginTop={5}
                disabled={verifyButtonDisabled}
                onPress={handleCheckCode}
                loading={codeCheckLoading}></RyusButton>
            </View>
          )}

          <View style={{height: 30}}></View>

          {!nextStep && (
            <>
              <RyusInput
                label={'비밀번호'}
                value={password}
                placeholder="영어 + 숫자 조합 8 ~ 20 글자"
                onChangeText={text => setPassword(text)}
                maxLength={20}
                password={true}
                errText={passwordError}></RyusInput>
              <RyusInput
                label={'비밀번호 확인'}
                value={confirmPassword}
                placeholder="비밀번호를 다시 입력하세요"
                onChangeText={text => setConfirmPassword(text)}
                maxLength={20}
                password={true}
                errText={confirmPasswordError}></RyusInput>
              <RyusButton
                text="회원가입"
                disabled={signButtonDisabled}
                onPress={handleSignUp}
                loading={signUpButtonLoading}></RyusButton>
            </>
          )}
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
