import axios from "axios";
import { BLOG_MANAGEMENT_ENDPOINT} from "@/constants/routesAPI";
import {getAdmin} from "@/services/admin.js";

export const getBlogManagement = async (filters) => {
    try {
        let url = BLOG_MANAGEMENT_ENDPOINT;
        
        if (Object.keys(filters).length > 0) {
            const queryParams = new URLSearchParams();
            
            if (filters.keyword) {
                queryParams.append('keyword', filters.keyword);
            }
            
            if (filters.page) {
                const start = (filters.page - 1) * (filters.limit || 5);
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
        return {
            blogs: data.pagination.results,
            pagination: {
                next: data.pagination.next,
                previous: data.pagination.previous,
                per_page: data.pagination.per_page,
                start_index: data.pagination.start_index,
                total_data: data.pagination.total_data
            }
        };
    } catch (error) {
        throw error;
    }
};

export async function createBlogManagement(blog) {
    try {
        const admin = await getAdmin();
        const formData = new FormData();
        
        formData.append('created_by', admin.id.toString());
        
        for (const [key, value] of blog.entries()) {
            formData.append(key, value);
        }

        const response = await axios.post(BLOG_MANAGEMENT_ENDPOINT, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data.data;
    } catch (error) {
        console.error("Create Blog Error:", error);
        throw new Error("Gagal membuat blog. Silakan coba lagi.");
    }
}


export async function updateBlogManagement(blogId, blog) {
    try {
        const admin = await getAdmin();
        blog.append('created_by', admin.id.toString());
        const response = await axios.put(`${BLOG_MANAGEMENT_ENDPOINT}/${blogId}`, blog, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal memperbarui blog:", error.response || error.message);
        throw new Error("Gagal memperbarui blog. Silakan coba lagi.");
    }
}

export async function deleteBlogManagement(blogId) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.delete(`${BLOG_MANAGEMENT_ENDPOINT}/${blogId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal menghapus blog:", error.response || error.message);
        throw new Error("Gagal menghapus blog. Silakan coba lagi.");
    }
}

export async function getBlogByIdManagement(blogId) {
    try {
        const response = await axios.get(`${BLOG_MANAGEMENT_ENDPOINT}/${blogId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.data.data.id;
    } catch (error) {
        throw new Error("Gagal mengambil blog. Silakan coba lagi.");
    }
}