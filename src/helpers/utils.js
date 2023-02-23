import AsyncStorage from '@react-native-async-storage/async-storage';

export async function authHeader() {
  const data = await AsyncStorage.getItem('user-data');
  const parsedData = JSON.parse(data);

  if (data && parsedData.token) {
    return {Authorization: 'Bearer ' + parsedData.token};
  } else {
    return {};
  }
}
