import axios from "axios";
import {PRODUCT_ENDPOINT} from "@/constants/routesAPI";

export const getProducts = async (filters) => {
    try {
        let url = PRODUCT_ENDPOINT;
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

        const response = await axios.get(url);
        const data = response.data.data;
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

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${PRODUCT_ENDPOINT}/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch product');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
}