import {BLOG_ENDPOINT} from "@/constants/routesAPI";
import axios from "axios";

export const getBlogs = async (filters) => {
    try {
        let url = BLOG_ENDPOINT;
        if (Object.keys(filters).length > 0) {
            const queryParams = new URLSearchParams();
            if (filters.keyword) {
                queryParams.append('keyword', filters.keyword);
            }
            if (filters.page) {
                const start = (filters.page - 1) * (filters.limit || 4) + 1;
                queryParams.append('start', start);
            }
            if (filters.limit) {
                queryParams.append('limit', filters.limit);
            }
            url += `?${queryParams.toString()}`;
        }

        const response = await axios.get(url);
        const data = response.data.data;

        return {
            latest_article: data.latest_article,
            articles: data.pagination.results,
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
            throw new Error(error.response.data.message || 'Failed to fetch articles');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
};
