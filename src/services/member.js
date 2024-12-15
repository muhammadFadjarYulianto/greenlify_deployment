import axios from "axios";
import {MEMBER_ENDPOINT} from "@/constants/routesAPI.js";

export const getMembers = async () => {
    try {
        const response = await axios.get(MEMBER_ENDPOINT);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Gagal mengambil data member');
        } else if (error.request) {
            throw new Error('Tidak ada respon dari server');
        } else {
            throw new Error('Error saat mengambil data');
        }
    }
}