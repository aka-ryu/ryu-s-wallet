import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../pages/guest/SignIn';
import SignUp from '../pages/guest/SignUp';
import ForgotPassword from '../pages/guest/ForgotPassword';
import {RootStackParamList} from '../interface/navigation';
import Routes from './Routes';
import {useTypedSelector} from '../redux/store';
import Home from '../pages/user/home';
import GetWallet from '../pages/user/getwallet';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigator = () => {
  const userState = useTypedSelector(state => state.user);
  return (
    <NavigationContainer>
      {!userState.is_login ? (
        <Stack.Navigator
          initialRouteName={Routes.SIGN_IN}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={Routes.SIGN_IN} component={SignIn} />
          <Stack.Screen name={Routes.SIGN_UP} component={SignUp} />
          <Stack.Screen
            name={Routes.FORGOT_PASSWORD}
            component={ForgotPassword}
          />
        </Stack.Navigator>
      ) : userState.is_wallet ? (
        <Stack.Navigator
          initialRouteName={Routes.HOME}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={Routes.HOME} component={Home} />
          <Stack.Screen name={Routes.GET_WALLET} component={GetWallet} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={Routes.GET_WALLET}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={Routes.GET_WALLET} component={GetWallet} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
