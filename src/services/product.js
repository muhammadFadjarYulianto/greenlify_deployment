import axios from "axios";
import { PAGINATION_PRODUCT_ENDPOINT, PRODUCT_FILTER_ENDPOINT } from "@/constants/routesAPI";

export async function productPagination(start = 1, limit = 8) {
    try {
        const response = await axios.get(`${PAGINATION_PRODUCT_ENDPOINT}?start=${start}&limit=${limit}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            console.error("Data tidak ditemukan di respons API.");
            throw new Error("Data produk tidak ditemukan.");
        }
    } catch (error) {
        console.error("Gagal mendapatkan data produk:", error.response || error.message);
        throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}

export async function getProductByPrice(min_price, max_price){
    try {
        const response = await axios.get(`${PRODUCT_FILTER_ENDPOINT}?min_price=${min_price}&max_price=${max_price}`, {});

        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            console.error("Data tidak ditemukan di respons API.");
            throw new Error("Data produk tidak ditemukan.");
        }
    } catch (error) {
        console.error("Gagal mendapatkan data produk:", error.response || error.message);
        throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}

export async function getProductByCategory(category_name) {
    try {
        const response = await axios.get(`${PRODUCT_FILTER_ENDPOINT}?category_name=${category_name}`, {});

        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            console.error("Data tidak ditemukan di respons API.");
            throw new Error("Data produk tidak ditemukan.");
        }
    } catch (error) {
        console.error("Gagal mendapatkan data produk:", error.response || error.message);
        throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}

export async function getProductBySearch(search){
    try {
        const response = await axios.get(`${PRODUCT_FILTER_ENDPOINT}?keyword=${search}`, {});

        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            console.error("Data tidak ditemukan di respons API.");
            throw new Error("Data produk tidak ditemukan.");
        }
    } catch (error) {
        console.error("Gagal mendapatkan data produk:", error.response || error.message);
        throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}