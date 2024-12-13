import {HISTORY_MANAGEMENT_ENDPOINT} from "@/constants/routesAPI.js";
import axios from "axios";

export const getHistory = async (start, limit) => {
    try {
        const response = await axios.get(HISTORY_MANAGEMENT_ENDPOINT, {
            params: {start, limit},
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const deleteHistory = async (id) => {
    try {
        const response = await axios.delete(`${HISTORY_MANAGEMENT_ENDPOINT}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}