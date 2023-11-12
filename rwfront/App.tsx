/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import Navigator from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function App(): JSX.Element {
  useEffect(() => {
    LottieSplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
