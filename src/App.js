/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// Error to resolve -> JSON value '' of type NSString cannot be converted to a YGValue, did you forget the % or pt suffix
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {useCallback} from 'react';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    'Material Icons': require('../ios/Fonts/MaterialIcons.ttf'),
    'Font Awesome5': require('../ios/Fonts/FontAwesome5_Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </SafeAreaProvider>
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
