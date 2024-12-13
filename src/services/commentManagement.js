import axios from "axios";
import { COMMENT_MANAGEMENT_ENDPOINT } from "@/constants/routesAPI";

export const getCommentManagement = async (filters) => {
    try {
      // Build base URL
      const url = new URL(COMMENT_MANAGEMENT_ENDPOINT);
      
      // Add query parameters if filters exist
      if (filters.keyword) {
        url.searchParams.append('keyword', filters.keyword);
      }
      
      if (filters.page) {
        const start = (filters.page - 1) * (filters.limit || 10);
        url.searchParams.append('start', String(start + 1));
      }
      
      if (filters.limit) {
        url.searchParams.append('limit', String(filters.limit));
      }
  
      // Make API request
      const response = await axios.get(url.toString(), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      // Return formatted data
      return {
        comments: response.data.data.results.map(comment => ({
          ...comment,
          status: comment.status.toUpperCase()
        })),
        pagination: {
          total_data: response.data.data.total_data,
          per_page: response.data.data.per_page
        }
      };
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      throw new Error('Failed to fetch comments. Please try again.');
    }
  };
  

export async function getDetailsCommentManagement(commentId) {
    try {
      const token = localStorage.getItem("access_token");
      
      if (!token) {
        throw new Error("Token not found");
      }
  
      const response = await axios.get(`${COMMENT_MANAGEMENT_ENDPOINT}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data.data;
    } catch (error) {
      console.error("Gagal mendapatkan data komentar:", error.response || error.message);
      throw new Error("Gagal mengambil data komentar. Silakan coba lagi.");
    }
  }

  export async function updateCommentManagement(commentId, action) {
    try {
      // Convert action to boolean for is_approved
      const is_approved = action === 'approve' ? true : false;
  
      const response = await axios.put(
        `${COMMENT_MANAGEMENT_ENDPOINT}/${commentId}`,
        { is_approved }, // Send is_approved in request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
          },
        }
      );
      
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  }
  
  
  
  export async function deleteCommentManagement(commentId) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.delete(`${COMMENT_MANAGEMENT_ENDPOINT}/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Gagal menghapus komentar:", error.response || error.message);
        throw new Error("Gagal menghapus komentar. Silakan coba lagi.");
    }
}

export const bulkUpdateComments = async (commentIds, action) => {
    try {
      const response = await axios.put(
        `${COMMENT_MANAGEMENT_ENDPOINT}/bulk-update`,
        {
          ids: commentIds,
          is_approved: action === 'approve' ? true : false
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update comments');
    }
  };
  
  
  