import axios from 'axios';
import api from '../lib/api';

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${api}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};

export const updateUserProfile = async (token, userData) => {
  try {
    const response = await axios.put(`${api}/user/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};
