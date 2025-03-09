import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'https://api-tak2xhbhba-uc.a.run.app';


export const detectFood = async (imageBase64: string) => {
  return axios.post(`${API_BASE}/detect-food`, {
    imageBase64
  });
};

export const checkAllergens = async (foodName: string) => {
  return axios.post(`${API_BASE}/check-allergens`, {
    foodName
  });
};
