import axios from 'axios';
import { API_BASE_URL, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from '@/constants/apiRoutes';

export async function login(email, password) {
  const response = await axios.post(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
    email,
    password,
  });
  return response.data;
}

export async function logout() {
  await axios.post(`${API_BASE_URL}${LOGOUT_ENDPOINT}`);
}

export async function getCurrentUser() {
  const response = await axios.get(`${API_BASE_URL}/me`);
  return response.data;
}