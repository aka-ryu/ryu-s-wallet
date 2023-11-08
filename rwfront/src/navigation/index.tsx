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
import {useEffect} from 'react';
import Mnemonic from '../pages/user/mnemonic';
import WalletImport from '../pages/user/walletImport';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigator = () => {
  const userState = useTypedSelector(state => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userState.is_login ? Routes.HOME : Routes.SIGN_IN}
        screenOptions={{headerShown: false}}>
        {/* Non-authenticated routes */}
        {!userState.is_login && (
          <>
            <Stack.Screen name={Routes.SIGN_IN} component={SignIn} />
            <Stack.Screen name={Routes.SIGN_UP} component={SignUp} />
            <Stack.Screen
              name={Routes.FORGOT_PASSWORD}
              component={ForgotPassword}
            />
          </>
        )}

        {/* Authenticated routes */}
        {userState.is_login && (
          <>
            <Stack.Screen name={Routes.HOME} component={Home} />
            <Stack.Screen name={Routes.MNEMONIC} component={Mnemonic} />
            <Stack.Screen name={Routes.GET_WALLET} component={GetWallet} />
            <Stack.Screen
              name={Routes.WALLET_IMPORT}
              component={WalletImport}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
