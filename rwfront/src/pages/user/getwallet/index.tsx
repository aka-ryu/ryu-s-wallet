import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/Header/header';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../interface/navigation';
import {useEffect} from 'react';
import {useTypedSelector} from '../../../redux/store';
import style from './style';
import RyusInput from '../../../components/RyusInput/ryusInput';
import RyusButton from '../../../components/RyusButton/ryusButton';

const GetWallet = () => {
  // useEffect(() => {
  //   Alert.alert(
  //     '현재 등록된 지갑이 없습니다.\n지갑을 생성 하시거나 기존 지갑을 불러오세요!',
  //   );
  // }, []);

  return (
    <SafeAreaView>
      <Header goBack={false} goLogout={true} title={'Wallet Info'}></Header>
      <ScrollView style={style.container}>
        <View style={{paddingTop: 100}}>
          <RyusButton text={'지갑 생성하기'}></RyusButton>
          <View style={{height: 30}}></View>
          <RyusButton text={'지갑 가져오기'}></RyusButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GetWallet;
