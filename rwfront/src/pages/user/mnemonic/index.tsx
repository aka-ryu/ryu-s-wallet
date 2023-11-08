import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../../../interface/navigation';
import Routes from '../../../navigation/Routes';
import Header from '../../../components/Header';
import style from './style';
import RyusButton from '../../../components/RyusButton';
import {copyText} from '../../../utils/copy';

const Mnemonic = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, Routes.MNEMONIC>>();
  const mnemonic = route.params.mnemonic;

  return (
    <SafeAreaView>
      <Header goBack={false} goLogout={false} title="Mnemonic"></Header>
      <ScrollView style={style.container}>
        <Text
          style={
            style.mnemonicTitle
          }>{`* 니모닉을 꼭 저장해두세요.\n* 절대 다시 제공되지 않습니다.`}</Text>
        <Text style={style.mnemonicText}>{mnemonic}</Text>

        <View style={style.textButtonLayer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://academy.dcentwallet.com/v/ko/crypto-walle/key-recovery-and-mnemonic-code',
              )
            }>
            <Text style={style.explanation}>니모닉이 무엇인가요?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              copyText(mnemonic);
            }}>
            <Text style={style.explanation}>복사하기</Text>
          </TouchableOpacity>
        </View>

        <RyusButton
          text="홈으로"
          onPress={() => navigation.navigate(Routes.HOME)}></RyusButton>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Mnemonic;
