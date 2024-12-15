import axios from "axios";
import { CATEGORIES_MANAGEMENT_ENDPOINT } from "@/constants/routesAPI";

export async function getCategoriesManagement() {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            return ("Token tidak tersedia. Silakan login kembali.");
        }

        const response = await axios.get(CATEGORIES_MANAGEMENT_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            console.error("Data kategori tidak ditemukan di respons API.");
            return ("Data kategori tidak ditemukan.");
        }
    } catch (error) {
        console.error("Gagal mendapatkan data kategori:", error.response || error.message);
        return ("Gagal mengambil data kategori. Silakan coba lagi.");
    }
}

export async function addCategory(categoryData) {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            return ("Token tidak tersedia. Silakan login kembali.");
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
        return ("Gagal menambahkan kategori. Silakan coba lagi.");
    }
}

export async function updateCategory(categoryId, categoryData) {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            return ("Token tidak tersedia. Silakan login kembali.");
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
        return ("Gagal memperbarui kategori. Silakan coba lagi.");
    }
}

export async function deleteCategory(categoryId) {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            return ("Token tidak tersedia. Silakan login kembali.");
        }

        const response = await axios.delete(`${CATEGORIES_MANAGEMENT_ENDPOINT}/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Gagal menghapus kategori:", error.response || error.message);
        return ("Gagal menghapus kategori. Silakan coba lagi.");
    }
}