import axios from 'axios';

const API_URL = 'http://localhost:5266/api';

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`, {
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
    const response = await axios.put(`${API_URL}/user/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};
