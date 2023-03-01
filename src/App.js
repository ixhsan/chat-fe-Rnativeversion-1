/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// Error to resolve -> JSON value '' of type NSString cannot be converted to a YGValue, did you forget the % or pt suffix
import {StyleSheet, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {useCallback} from 'react';
import rootReducers from './reducers';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const store = createStore(rootReducers, applyMiddleware(thunk));

const App = () => {
  const [fontsLoaded] = useFonts({
    'Material Icons': require('../ios/Fonts/MaterialIcons.ttf'),
    MaterialIcons: require('../android/app/src/main/assets/fonts/MaterialIcons.ttf'),
    'Font Awesome5': require('../ios/Fonts/FontAwesome5_Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#EEE',
    borderRadius: 30,
    borderBottomWidth: 1,
    marginVertical: 5,
    width: 250,
    height: 45,
    // marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
