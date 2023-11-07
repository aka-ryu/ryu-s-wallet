import {SafeAreaView, ScrollView, View} from 'react-native';
import Header from '../../../components/Header';
import {useState} from 'react';
import style from './style';
import RyusButton from '../../../components/RyusButton';
import LoadingModal from '../../../components/Modal/LoadingModal';
import Api from '../../../components/Api';

const GetWallet = () => {
  // useEffect(() => {
  //   Alert.alert(
  //     '현재 등록된 지갑이 없습니다.\n지갑을 생성 하시거나 기존 지갑을 불러오세요!',
  //   );
  // }, []);
  const [loadingVisible, setLoadingVisible] = useState(false);

  const handleGetNewWallet = async () => {
    // setLoadingVisible(true);
    const response = await Api.walletCreate();
    console.log(response);

    if (response.result === 'success') {
    }
    // setLoadingVisible(false);
  };

  return (
    <SafeAreaView>
      <Header goBack={false} goLogout={true} title={'Wallet Info'}></Header>
      <ScrollView style={style.container}>
        <View style={{paddingTop: 100}}>
          <RyusButton
            text={'지갑 생성하기'}
            onPress={handleGetNewWallet}></RyusButton>
          <View style={{height: 30}}></View>
          <RyusButton text={'지갑 가져오기'}></RyusButton>
        </View>
      </ScrollView>
      <LoadingModal visible={loadingVisible}></LoadingModal>
    </SafeAreaView>
  );
};

export default GetWallet;
