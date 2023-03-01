import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../../actions/action.auth';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [username, setUsername] = useState();
  const insets = useSafeAreaInsets();

  const test = () => {
    console.log('db', state.db);
    console.log('user', state.user);
  };

  const handleSubmit = () => {
    if (username === '') return;
    dispatch(signIn(username));
    setUsername('');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.headerText}>USER LOGIN</Text>
            </View>
            <View style={styles.formBody}>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.inputIcon}
                  source={{
                    uri: 'https://img.icons8.com/ios-glyphs/512/key.png',
                  }}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Username"
                  placeholderTextColor={'black'}
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  onChangeText={text => setUsername(text)}
                />
              </View>
              <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={handleSubmit}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={test}>
            <Text style={styles.loginText}>test button</Text>
          </TouchableOpacity> */}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: '2%',
    paddingHorizontal: '8%',
  },
  formContainer: {
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '8%',
  },
  formHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
  },
  headerText: {fontSize: 24, fontWeight: '600'},
  formBody: {
    marginBottom: 5,
    paddingVertical: '2%',
    paddingHorizontal: '8%',
    // borderColor: 'purple',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  inputContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#EEE',
    borderRadius: 30,
    borderBottomWidth: 1,
  },
  inputs: {
    padding: '6%',
    fontSize: 18,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    paddingVertical: '6%',
    paddingHorizontal: '5%',
    marginLeft: 15,
    justifyContent: 'center',
    backgroundColor: '#EEE',
  },
  buttonContainer: {
    paddingVertical: '5%',
    paddingHorizontal: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#1c94f7',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Login;
