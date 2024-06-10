import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// API Base URL
const api = axios.create({
  baseURL: 'http://localhost:5266/api',
});

// Web ve Mobil için token saklama fonksiyonları
const setToken = async (token) => {
  if (typeof window !== 'undefined') {
    // Web ortamı
    localStorage.setItem('jwt_token', token);
  } else {
    // Mobil ortam
    await SecureStore.setItemAsync('jwt_token', token);
  }
};

export const getToken = async () => {
  if (typeof window !== 'undefined') {
    // Web ortamı
    return localStorage.getItem('jwt_token');
  } else {
    // Mobil ortam
    return await SecureStore.getItemAsync('jwt_token');
  }
};

const removeToken = async () => {
  if (typeof window !== 'undefined') {
    // Web ortamı
    localStorage.removeItem('jwt_token');
  } else {
    // Mobil ortam
    await SecureStore.deleteItemAsync('jwt_token');
  }
};

// Login fonksiyonu
export const login = async (email, password) => {
  try {
    const response = await api.post('/user/authenticate', { email, password });
    const { token } = response.data;

    await setToken(token);

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Register fonksiyonu
export const register = async (userData) => {
  try {
    const response = await api.post('/user/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// Token alma fonksiyonu
export const getStoredToken = async () => {
  return await getToken();
};

// Logout fonksiyonu
export const logout = async () => {
  await removeToken();
};

// API istekleri için token ekleme
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
