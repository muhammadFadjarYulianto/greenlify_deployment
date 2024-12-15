import axios from "axios";
import { ADMIN } from "@/constants/routesAPI";

export async function getAdmin() {
    try {
        const response = await axios.get(ADMIN, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
            },
        });
        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error("Gagal mengambil data admin. Silakan coba lagi.");
    }
}