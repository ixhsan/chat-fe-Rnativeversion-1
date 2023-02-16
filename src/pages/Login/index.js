import {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '70%',
          height: '30%',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 20,
          borderColor: 'grey',
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
                placeholder="Username"
                placeholderTextColor={'black'}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={password => setPassword({password})}
              />
            </View>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => navigation.navigate('Contact')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#EEE',
    borderRadius: 30,
    borderBottomWidth: 1,
    marginVertical: 5,
    width: 220,
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
    width: 220,
    borderRadius: 30,
    // borderColor: 'purple',
    // borderWidth: 1,
    // borderStyle: 'solid',
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
