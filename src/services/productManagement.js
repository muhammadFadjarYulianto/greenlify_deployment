import axios from "axios";
import {PRODUCT_MANAGEMENT_ENDPOINT, PRODUCT_PAGINATION_ENDPOINT} from "@/constants/routesAPI";
import {getAdmin} from "@/services/admin.js";


  export const getProductsManagement = async (filters) => {
    try {
        let url = PRODUCT_MANAGEMENT_ENDPOINT;
        if (Object.keys(filters).length > 0) {
            const queryParams = new URLSearchParams();
            if (filters.category_name) {
                queryParams.append('category_name', filters.category_name);
            }
            if (filters.min_price !== undefined && filters.min_price !== '') {
                queryParams.append('min_price', filters.min_price);
            }
            if (filters.max_price !== undefined && filters.max_price !== '') {
                queryParams.append('max_price', filters.max_price);
            }
            if (filters.keyword) {
                queryParams.append('keyword', filters.keyword);
            }
            if (filters.page) {
                const start = (filters.page - 1) * (filters.limit || 4);
                queryParams.append('start', start + 1);
            }
            if (filters.limit) {
                queryParams.append('limit', filters.limit);
            }
            url += `?${queryParams.toString()}`;
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        const data = response.data.data;
        console.log(data);
        return {
            categories: data.categories,
            products: data.pagination.results,
            pagination: {
                next: data.pagination.next,
                previous: data.pagination.previous,
                per_page: data.pagination.per_page,
                start_index: data.pagination.start_index,
                total_data: data.pagination.total_data
            }
        };
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch products');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
}


export async function createProductManagement(product) {
    try {
        const admin = await getAdmin();
        product.append('created_by', admin.id.toString());
        const response = await axios.post(PRODUCT_MANAGEMENT_ENDPOINT, product, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal membuat produk:", error.response || error.message);
        throw new Error("Gagal membuat produk. Silakan coba lagi.");
    }
}

export async function updateProductManagement(productId, product) {
    try {
        const admin = await getAdmin();
        product.append('created_by', admin.id.toString());
        const response = await axios.put(`${PRODUCT_MANAGEMENT_ENDPOINT}/${productId}`, product, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal memperbarui produk:", error.response || error.message);
        throw new Error("Gagal memperbarui produk. Silakan coba lagi.");
    }
}

export async function deleteProductManagement(productId) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.delete(`${PRODUCT_MANAGEMENT_ENDPOINT}/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal menghapus produk:", error.response || error.message);
        throw new Error("Gagal menghapus produk. Silakan coba lagi.");
    }
}

export async function getProductsByCategoryManagement(category) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.get(`${PRODUCT_MANAGEMENT_ENDPOINT}?category=${category}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal mendapatkan data produk:", error.response || error.message);
        throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}

export async function getProductsBySearchManagement(search) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.get(`${PRODUCT_MANAGEMENT_ENDPOINT}?search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal mendapatkan data produk:", error.response || error.message);
        throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}

export async function getDetailsProductManagement(productId) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.get(`${PRODUCT_MANAGEMENT_ENDPOINT}/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data.id;
    } catch (error) {
        console.error("Gagal mendapatkan data produk:", error.response || error.message);
        throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}