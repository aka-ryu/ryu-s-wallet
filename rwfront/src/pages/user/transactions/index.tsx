import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/Header';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../interface/navigation';
import {useTypedSelector} from '../../../redux/store';
import style from './style';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import Api from '../../../components/Api';

interface Tx {
  created_at: string;
  result: number;
  send_type: string;
  tx_id: string;
}

const Transactions = () => {
  const [txList, setTxList] = useState<Tx[]>([]);
  useEffect(() => {
    handleGetTransactions();
    Alert.alert('해쉬 클릭시 이더스캔에서 조회');
  }, []);

  useEffect(() => {
    console.log(txList);
  }, [txList]);
  const handleGetTransactions = async () => {
    const response = await Api.getTransactions();
    setTxList(response.data.txList);
  };
  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} goLogout={false} title="Transaction List"></Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        {txList.map(tx => {
          return (
            <View style={style.txCard}>
              <Text style={tx.result === 1 ? style.success : style.fail}>
                {tx.result === 1 ? '성공' : '실패'}
              </Text>
              <View style={style.txMiddleLayer}>
                <Text style={style.sendType}>{tx.send_type}</Text>
                <Text>
                  <Text style={style.ryu}>10</Text> RYU
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://sepolia.etherscan.io/tx/${tx.tx_id}`,
                    )
                  }>
                  <Text>{`해쉬 : ${tx.tx_id}`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transactions;
