export const API_BASE_URL = 'https://api.example.com/v1';

export const USERS_ENDPOINT = `${API_BASE_URL}/users`;
export const LOGIN_ENDPOINT = `${API_BASE_URL}/login`;
export const LOGOUT_ENDPOINT = `${API_BASE_URL}/logout`;

export const PRODUCTS_ENDPOINT = `${API_BASE_URL}/products`;
export const ORDERS_ENDPOINT = `${API_BASE_URL}/orders`;

export const GET_USER_BY_ID = (userId) => `${USERS_ENDPOINT}/${userId}`;
export const CREATE_ORDER = `${ORDERS_ENDPOINT}`;
export const UPDATE_PRODUCT = (productId) => `${PRODUCTS_ENDPOINT}/${productId}`;