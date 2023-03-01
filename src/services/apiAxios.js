import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function authInterceptor(config) {
  const data = await AsyncStorage.getItem('user-data');
  const parsedData = JSON.parse(data);
  if (parsedData && parsedData.token) {
    config.headers.Authorization = `Bearer ${parsedData.token}`;
  }
  return config;
}

const api = axios.create({
  baseURL: 'http://192.168.1.6:3036',
  timeout: 3000,
});

api.interceptors.request.use(authInterceptor);

export default api;
