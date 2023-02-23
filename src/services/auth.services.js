import api from './apiAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userSignIn = async ({username}) => {
  try {
    const {data: response} = await api.post('/api/auth/signin', {username});
    if (!response.success) throw response;

    await setAsyncStorage(response.data);

    return response;
  } catch (error) {
    console.log(
      `SERVICE AUTH FAILED\nError\t: ${error.name}\nCode\t: ${error.code}\nMessage\t: ${error.message}`,
    );
    return error;
  }
};

const userSignOut = async () => {
  try {
    const response = await api.post('/api/auth/signout');
    if (!response.data.success) throw response;

    await setAsyncStorage(null, false);

    return response;
  } catch (error) {
    console.log(
      `SERVICE AUTH FAILED\nError\t: ${error.name}\nCode\t: ${error.code}\nMessage\t: ${error.message}`,
    );
    await setAsyncStorage(null, false);
    // setAuthentication(null, false);

    return error;
  }
};

const setAsyncStorage = async (data, set = true) => {
  return set
    ? await AsyncStorage.setItem('user-data', JSON.stringify(data))
    : await AsyncStorage.removeItem('user-data');
};

export default {
  userSignIn,
  userSignOut,
};
