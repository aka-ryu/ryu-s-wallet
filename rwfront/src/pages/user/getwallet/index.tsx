import {Alert, SafeAreaView, ScrollView, View} from 'react-native';
import Header from '../../../components/Header';
import {useState} from 'react';
import style from './style';
import RyusButton from '../../../components/RyusButton';
import LoadingModal from '../../../components/Modal/LoadingModal';
import Api from '../../../components/Api';
import {useDispatch} from 'react-redux';
import {setWallet} from '../../../redux/slices/userSlice';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../interface/navigation';
import Routes from '../../../navigation/Routes';

const GetWallet = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // useEffect(() => {
  //   Alert.alert(
  //     '현재 등록된 지갑이 없습니다.\n지갑을 생성 하시거나 기존 지갑을 불러오세요!',
  //   );
  // }, []);
  const dispatch = useDispatch();
  const [loadingVisible, setLoadingVisible] = useState(false);

  const handleGetNewWallet = async () => {
    setLoadingVisible(true);
    const response = await Api.walletCreate();

    if (response.result === 'success') {
      dispatch(setWallet({is_wallet: true}));
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
          <RyusButton
            text={'홈으로'}
            onPress={() => navigation.navigate(Routes.HOME)}></RyusButton>
        </View>
      </ScrollView>
      <LoadingModal visible={loadingVisible}></LoadingModal>
    </SafeAreaView>
  );
};

export default GetWallet;
