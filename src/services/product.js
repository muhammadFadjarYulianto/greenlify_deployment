import axios from "axios";
import { API_BASE_URL, PRODUCTS_ENDPOINT } from "@/constants/apiRoutes";

export async function getProducts() {
  const response = await axios.get(`${API_BASE_URL}${PRODUCTS_ENDPOINT}`);
  return response.data;
}

export async function getProductById(productId) {
  const response = await axios.get(`${API_BASE_URL}${PRODUCTS_ENDPOINT}/${productId}`);
  return response.data;
}

export async function createProduct(product) {
    const response = await axios.post(`${API_BASE_URL}${PRODUCTS_ENDPOINT}`, product);
    return response.data;
}

export async function updateProduct(productId, product) {
    const response = await axios.put(`${API_BASE_URL}${PRODUCTS_ENDPOINT}/${productId}`, product);
    return response.data;
}

export async function deleteProduct(productId) {
    const response = await axios.delete(`${API_BASE_URL}${PRODUCTS_ENDPOINT}/${productId}`);
    return response.data;
}

export async function getProductsByCategory(category) {
    const response = await axios.get(`${API_BASE_URL}${PRODUCTS_ENDPOINT}?category=${category}`);
    return response.data;
}

export async function getProductsBySearch(search) {
    const response = await axios.get(`${API_BASE_URL}${PRODUCTS_ENDPOINT}?search=${search}`);
    return response.data;
}