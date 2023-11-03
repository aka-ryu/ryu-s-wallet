import {ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header/header';

const SignUp = () => {
  return (
    <SafeAreaView>
      <Header goBack={true} title={'Sign Up'}></Header>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
