import axios from "axios";
import {PRODUCT_ENDPOINT, PRODUCT_FILTER_ENDPOINT} from "@/constants/routesAPI";

export const getProducts = async () => {
    try {
        const response = await axios.get(PRODUCT_ENDPOINT);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch products');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
}

export const getProductByMultipleFilter = async (filters) => {
    try {
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
            queryParams.append('page', filters.page);
        }
        if (filters.limit) {
            queryParams.append('limit', filters.limit);
        }
        const response = await axios.get(`${PRODUCT_FILTER_ENDPOINT}?${queryParams.toString()}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch products');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
}

// export const getProductByCategory = async (categoryName) => {
//     return getProductByMultipleFilter({ category_name: categoryName });
// };
//
// export const getProductByPrice = async (minPrice, maxPrice) => {
//     return getProductByMultipleFilter({ min_price: minPrice, max_price: maxPrice });
// };
//
// export const getProductBySearch = async (keyword) => {
//     return getProductByMultipleFilter({ keyword });
// };