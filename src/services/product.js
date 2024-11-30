import axios from "axios";
import { PRODUCTS_ENDPOINT } from "@/constants/routesAPI";

/**
 * Mendapatkan data produk dari server.
 * @returns {Promise<object>} - Data produk dari API.
 */
export async function getProducts() {
    try {
        // Tambahkan token ke header
        const response = await axios.get(PRODUCTS_ENDPOINT, {
        });

        // Debugging: Log seluruh respons
        // console.log("Full response:", response);

        // Cek jika respons data ada dan mengandung properti data
        if (response.data && response.data.data) {
            return response.data.data; // Kembalikan data produk
        } else {
            console.error("Data tidak ditemukan di respons API.");
            throw new Error("Data produk tidak ditemukan.");
        }
    } catch (error) {
        console.error("Gagal mendapatkan data produk:", error.response || error.message);
        throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}

// export async function getProductById(productId) {
//   const response = await axios.get(`${API_BASE_URL}${PRODUCTS_ENDPOINT}/${productId}`);
//   return response.data;
// }
//
// export async function createProduct(product) {
//     const response = await axios.post(`${API_BASE_URL}${PRODUCTS_ENDPOINT}`, product);
//     return response.data;
// }
//
// export async function updateProduct(productId, product) {
//     const response = await axios.put(`${API_BASE_URL}${PRODUCTS_ENDPOINT}/${productId}`, product);
//     return response.data;
// }
//
// export async function deleteProduct(productId) {
//     const response = await axios.delete(`${API_BASE_URL}${PRODUCTS_ENDPOINT}/${productId}`);
//     return response.data;
// }
//
// export async function getProductsByCategory(category) {
//     const response = await axios.get(`${API_BASE_URL}${PRODUCTS_ENDPOINT}?category=${category}`);
//     return response.data;
// }
//
// export async function getProductsBySearch(search) {
//     const response = await axios.get(`${API_BASE_URL}${PRODUCTS_ENDPOINT}?search=${search}`);
//     return response.data;
// }