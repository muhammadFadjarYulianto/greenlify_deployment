import axios from "axios";
import { CATEGORIES_MANAGEMENT_ENDPOINT, CATEGORIES_PAGINATION_ENDPOINT } from "@/constants/routesAPI";


export async function getCategoriesManagement(start = 1, limit = 5) {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) {
            throw new Error("Token tidak tersedia. Silakan login kembali.");
        }

        const response = await axios.get(
            `${CATEGORIES_MANAGEMENT_ENDPOINT}?start=${start}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        
        if (response.data && response.data.data && response.data.data.results) {
            return response.data.data; // Mengembalikan objek paginasi
        } else {
            throw new Error("Data kategori tidak ditemukan.");
        }
    } catch (error) {
        console.error("Gagal mendapatkan data kategori:", error.response || error.message);
        throw new Error("Gagal mengambil data kategori. Silakan coba lagi.");
    }
}


export async function addCategory(categoryData) {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            throw new Error("Token tidak tersedia. Silakan login kembali.");
        }

        const response = await axios.post(CATEGORIES_MANAGEMENT_ENDPOINT, categoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Gagal menambahkan kategori:", error.response || error.message);
        throw new Error("Gagal menambahkan kategori. Silakan coba lagi.");
    }
}

export async function updateCategory(categoryId, categoryData) {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            throw new Error("Token tidak tersedia. Silakan login kembali.");
        }

        const response = await axios.put(`${CATEGORIES_MANAGEMENT_ENDPOINT}/${categoryId}`, categoryData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Gagal memperbarui kategori:", error.response || error.message);
        throw new Error("Gagal memperbarui kategori. Silakan coba lagi.");
    }
}

export async function deleteCategory(categoryId) {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            throw new Error("Token tidak tersedia. Silakan login kembali.");
        }

        const response = await axios.delete(`${CATEGORIES_MANAGEMENT_ENDPOINT}/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Gagal menghapus kategori:", error.response || error.message);
        throw new Error("Gagal menghapus kategori. Silakan coba lagi.");
    }
}