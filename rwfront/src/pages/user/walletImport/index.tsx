import {Alert, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Header from '../../../components/Header';
import {useEffect, useState} from 'react';
import style from './style';
import RyusButton from '../../../components/RyusButton';
import LoadingModal from '../../../components/Modal/LoadingModal';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../interface/navigation';
import RyusInput from '../../../components/RyusInput';
import {mnemonicRegex} from '../../../interface/regex';
import Api from '../../../components/Api';
import {useDispatch} from 'react-redux';
import {setWallet} from '../../../redux/slices/userSlice';
import Routes from '../../../navigation/Routes';

const WalletImport = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    handleVaildCheck();
  }, [inputValue]);

  const handleVaildCheck = () => {
    setButtonDisabled(!mnemonicRegex.test(inputValue));
  };

  const handleGetWallet = async () => {
    setLoadingVisible(true);
    const response = await Api.walletImport({value: inputValue});

    if (response.result === 'success') {
      dispatch(
        setWallet({
          is_wallet: true,
          address: response.data.walletAddress,
          balance: 0,
        }),
      );
      Alert.alert(response.message);

      navigation.navigate(Routes.HOME);
    } else {
      Alert.alert(response.message);
    }
    setLoadingVisible(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} goLogout={false} title={'Wallet Import'}></Header>
      <ScrollView>
        <Text style={style.text}>* 니모닉을 입력해주세요.</Text>
        <RyusInput
          value={inputValue}
          multiline={true}
          inputHeight={250}
          maxLength={150}
          onChangeText={text => {
            setInputValue(text);
          }}
        />
        <View style={{height: 30}}></View>
        <RyusButton
          text="지갑 가져오기"
          disabled={buttonDisabled}
          onPress={() => {
            handleGetWallet();
          }}></RyusButton>
      </ScrollView>
      <LoadingModal visible={loadingVisible}></LoadingModal>
    </SafeAreaView>
  );
};

export default WalletImport;
