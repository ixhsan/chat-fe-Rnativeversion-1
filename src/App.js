/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '70%',
          height: '30%',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 20,
          borderColor: 'green',
          borderWidth: 1,
          borderStyle: 'solid',
        }}>
        <View
          style={{
            height: '50%',
            flex: 1,
            alignItems: 'center',
            // borderColor: 'orange',
            // borderWidth: 1,
            // borderStyle: 'solid',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 20,
              // borderColor: 'purple',
              // borderWidth: 1,
              // borderStyle: 'solid',
            }}>
            <Text style={{fontSize: 24, fontWeight: '600'}}>USER LOGIN</Text>
          </View>
          <View
            style={{
              flex: 2,
              // borderColor: 'red',
              // borderWidth: 1,
              // borderStyle: 'solid',
              marginBottom: 5,
            }}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                source={{uri: 'https://img.icons8.com/ios-glyphs/512/key.png'}}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={password => setPassword({password})}
              />
            </View>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              // onPress={() => showAlert('login')}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
  inputs: {
    height: 45,
    marginLeft: 16,
    fontSize: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
    backgroundColor: '#EEE',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    width: 250,
    borderRadius: 30,
    // borderColor: 'purple',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
});

// JSON value '' of type NSString cannot be converted to a YGValue, did you forget the % or pt suffix

export default App;
