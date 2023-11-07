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

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userState = useTypedSelector(state => state.user);
  console.log('유저', userState);

  return (
    <SafeAreaView>
      <Header goBack={false} goLogout={true}></Header>
      <ScrollView>
        <Text>home</Text>
        <TouchableOpacity onPress={() => navigation.goBack}>
          <Text>gd</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
