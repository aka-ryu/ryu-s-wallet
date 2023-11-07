import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/Header';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../interface/navigation';
import {useEffect, useState} from 'react';
import {useTypedSelector} from '../../../redux/store';
import style from './style';
import RyusInput from '../../../components/RyusInput';
import RyusButton from '../../../components/RyusButton';
import RyusModal from '../../../components/RyusModal';

const GetWallet = () => {
  // useEffect(() => {
  //   Alert.alert(
  //     '현재 등록된 지갑이 없습니다.\n지갑을 생성 하시거나 기존 지갑을 불러오세요!',
  //   );
  // }, []);
  const [modalVisible, setModalVisible] = useState(false);

  const handleGetNewWallet = async () => {
    setModalVisible(true);

    setModalVisible(false);
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
      <RyusModal visible={modalVisible}></RyusModal>
    </SafeAreaView>
  );
};

export default GetWallet;
