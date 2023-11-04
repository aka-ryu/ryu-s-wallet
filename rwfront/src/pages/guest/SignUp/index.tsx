import {Alert, ScrollView, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header/header';
import style from './style';
import RyusInput from '../../../components/RyusInput/ryusInput';
import RyusButton from '../../../components/RyusButton/ryusButton';
import {useEffect, useState} from 'react';
import React from 'react';
import Api from '../../../components/Api';

const SignUp = () => {
  const [codeButtonDisabled, setCodeButtonDisabled] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [codeSendLoading, setCodeSendLoading] = useState(false);

  const [authenticating, setAuthenticating] = useState(false);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    setCodeButtonDisabled(!emailRegex.test(String(email).toLowerCase()));
  }, [email]);

  const handleEditEmail = () => {
    setEmail('');
    setAuthenticating(false);
    setCodeButtonDisabled(false);
  };

  const handleSendVerfiyCode = async () => {
    setAuthenticating(true);
    setCodeButtonDisabled(true);
    setCodeSendLoading(true);
    const response = await Api.sendEmailVerfyCode({email: email});
    setCodeSendLoading(false);
    console.log(response);
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
              disabled={codeButtonDisabled}
              onPress={handleSendVerfiyCode}></RyusButton>
          </View>
          {authenticating && (
            <View style={{marginTop: 30}}>
              <RyusInput label={'인증번호'} value={code}></RyusInput>
              <RyusButton
                text="이메일 주소 수정"
                onPress={handleEditEmail}></RyusButton>
              <RyusButton text="인증번호 확인" marginTop={5}></RyusButton>
            </View>
          )}

          <View style={{height: 30}}></View>
          {/* <RyusInput label={'비밀번호'}></RyusInput>
          <RyusInput label={'비밀번호 확인'}></RyusInput> */}
          <RyusButton text="회원가입" disabled={buttonDisabled}></RyusButton>
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
