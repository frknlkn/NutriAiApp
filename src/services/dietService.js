import api from '../lib/api';


// Diyet listelerini almak için
export const getDietPlans = async () => {
  try {
    const response = await api.get('/dietplan/dietplans');
    console.log('Diet Plans Response:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching diet plans:', error);
    throw error;
  }
};

// Diyet planı oluşturmak için
export const generateDietPlan = async () => {
  try {
    const response = await api.post('/dietplan/generate');
    return response.data;
  } catch (error) {
    console.error('Error generating diet plan:', error);
    throw error;
  }
};
