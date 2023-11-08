import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../interface/navigation';
import {useEffect} from 'react';
import {useTypedSelector} from '../../../redux/store';
import Routes from '../../../navigation/Routes';
import Api from '../../../components/Api';

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userState = useTypedSelector(state => state.user);

  const handleWalletDisconnect = async () => {
    const response = await Api.walletDisconnect();
    console.log(response);
  };

  return (
    <SafeAreaView>
      <Header goBack={false} goLogout={true}></Header>
      <ScrollView>
        <Text>home</Text>
        <TouchableOpacity onPress={() => navigation.goBack}>
          <Text>gd</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.MNEMONIC, {
              mnemonic:
                '111 2222 333333 444 5555 6666 77777 8888 999999 101010 11111 1212 131 1414',
            });
          }}>
          <Text>gd</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleWalletDisconnect();
          }}>
          <Text>지갑삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.GET_WALLET)}>
          <Text>겟월렛가기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
