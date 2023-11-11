import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/Header';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../../interface/navigation';
import {useEffect, useState} from 'react';
import {useTypedSelector} from '../../../redux/store';
import Routes from '../../../navigation/Routes';
import Api from '../../../components/Api';
import style from './style';
import {useDispatch} from 'react-redux';
import {getBalance, setFirstReword} from '../../../redux/slices/userSlice';
import {copyText} from '../../../utils/copy';
import LoadingModal from '../../../components/Modal/LoadingModal';
import RyusButton from '../../../components/RyusButton';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userState = useTypedSelector(state => state.user);
  const [loadingVisible, setLoadingVisible] = useState(false);

  useEffect(() => {
    if (!userState.is_first_reword) {
      handleGetFirstReword();
    }
  }, []);

  // const handleWalletDisconnect = async () => {
  //   const response = await Api.walletDisconnect();
  //   navigation.navigate(Routes.GET_WALLET);
  // };

  const handleGetBalance = async () => {
    setLoadingVisible(true);
    const response = await Api.getBalance();
    if (response.result === 'success') {
      dispatch(getBalance({balance: response.data.balance}));
    }
    Alert.alert(response.message);
    setLoadingVisible(false);
  };

  const truncateText = (text: string) => {
    return text.substring(0, 20) + '...';
  };

  const formatNumber = (num: string) => {
    return Number(num).toFixed(2);
  };

  const handleGetFirstReword = async () => {
    const response = await Api.getFirstReword();
    if (response.result === 'success') {
      dispatch(setFirstReword({is_first_reword: true}));
      Alert.alert(response.message);
    }
  };

  const handleAttendance = async () => {
    setLoadingVisible(true);
    const response = await Api.attendanceCheck();
    Alert.alert(response.message);
    setLoadingVisible(false);
  };

  const handleCoffeeCode = async () => {
    if (userState.balance < 30) {
      Alert.alert('RYU TOKEN 이 부족합니다.');
      return;
    }
    setLoadingVisible(true);

    const response = await Api.coffeeCode();
    Alert.alert(response.message);
    setLoadingVisible(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} goLogout={true}></Header>
      <ScrollView>
        <View style={style.walletCard}>
          <View style={style.addressLayer}>
            <Text style={style.walletAddress}>
              {truncateText(userState.address)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                copyText(userState.address);
              }}>
              <Image
                source={require('../../../asset/icon/copy.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
          <View style={style.tokenLayer}>
            <View>
              <Text style={style.tokenValance}>
                {formatNumber(userState.balance.toString())}
                <Text style={style.tokenSymbol}>RYU</Text>
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleGetBalance()}>
                <Image
                  source={require('../../../asset/icon/refresh.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={style.buttonLayer}>
          <RyusButton
            marginTop={30}
            text={'출석체크'}
            onPress={() => {
              handleAttendance();
            }}></RyusButton>
          <RyusButton
            marginTop={30}
            text={'트랜잭션 목록'}
            onPress={() =>
              navigation.navigate(Routes.TRANSACTIONS)
            }></RyusButton>
          {/* <RyusButton
            marginTop={30}
            text={'지갑 연결 해제'}
            onPress={() => {
              handleWalletDisconnect();
            }}></RyusButton> */}
          <RyusButton
            marginTop={30}
            text={'커피 쿠폰 (30 RYU)'}
            onPress={() => {
              handleCoffeeCode();
            }}></RyusButton>
          <Text>* 빽다방 아메리카노 쿠폰 선착순 3장 입니다.</Text>
        </View>
      </ScrollView>
      <LoadingModal visible={loadingVisible}></LoadingModal>
    </SafeAreaView>
  );
};

export default Home;
