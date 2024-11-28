import axios from "axios";
import { PRODUCT_MANAGEMENT_ENDPOINT } from "@/constants/routesAPI";

/**
 * Mendapatkan data produk dari server.
 * @returns {Promise<object>} - Data produk dari API.
 */
export async function getProductsManagement() {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            throw new Error("Token tidak tersedia. Silakan login kembali.");
        }

        // Tambahkan token ke header
        const response = await axios.get(PRODUCT_MANAGEMENT_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Debugging: Log seluruh respons
        console.log("Full response:", response);

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