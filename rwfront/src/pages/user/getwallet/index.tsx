import {Alert, SafeAreaView, ScrollView, View} from 'react-native';
import Header from '../../../components/Header';
import {useEffect, useState} from 'react';
import style from './style';
import RyusButton from '../../../components/RyusButton';
import LoadingModal from '../../../components/Modal/LoadingModal';
import Api from '../../../components/Api';
import {useDispatch} from 'react-redux';
import {setWallet} from '../../../redux/slices/userSlice';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../interface/navigation';
import Routes from '../../../navigation/Routes';
import {useTypedSelector} from '../../../redux/store';

const GetWallet = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [loadingVisible, setLoadingVisible] = useState(false);
  const userState = useTypedSelector(state => state.user);
  useEffect(() => {
    if (userState.is_wallet) {
      navigation.navigate(Routes.HOME);
    }
  }, []);

  const handleGetNewWallet = async () => {
    setLoadingVisible(true);
    const response = await Api.walletCreate();

    if (response.result === 'success') {
      dispatch(
        setWallet({
          is_wallet: true,
          balance: 0,
          address: response.data.address,
        }),
      );
      Alert.alert(response.message);

      navigation.navigate(Routes.MNEMONIC, {
        mnemonic: response.data.mnemonic.phrase,
      });
    } else {
      Alert.alert(response.message);
    }
    setLoadingVisible(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} goLogout={true} title={'Wallet Info'}></Header>
      <ScrollView>
        <View style={{paddingTop: 100}}>
          <RyusButton
            text={'지갑 생성하기'}
            onPress={handleGetNewWallet}></RyusButton>
          <View style={{height: 30}}></View>
          <RyusButton
            text={'지갑 가져오기'}
            onPress={() =>
              navigation.navigate(Routes.WALLET_IMPORT)
            }></RyusButton>
        </View>
      </ScrollView>
      <LoadingModal visible={loadingVisible}></LoadingModal>
    </SafeAreaView>
  );
};

export default GetWallet;
