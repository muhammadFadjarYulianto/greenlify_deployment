import axios from "axios";
import { MEMBERS_MANAGEMENT_ENDPOINT } from "@/constants/routesAPI";

export async function getMembersManagement() {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            throw new Error("Token tidak tersedia. Silakan login kembali.");
        }

        const response = await axios.get(MEMBERS_MANAGEMENT_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            console.error("Data member tidak ditemukan di respons API.");
            throw new Error("Data member tidak ditemukan.");
        }
    } catch (error) {
        console.error("Gagal mendapatkan data member:", error.response || error.message);
        throw new Error("Gagal mengambil data member. Silakan coba lagi.");
    }
}

export async function addMember(memberData) {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            throw new Error("Token tidak tersedia. Silakan login kembali.");
        }

        const response = await axios.post(MEMBERS_MANAGEMENT_ENDPOINT, memberData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Gagal menambahkan member:", error.response || error.message);
        throw new Error("Gagal menambahkan member. Silakan coba lagi.");
    }
}

export async function updateMember(memberId, memberData) {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            throw new Error("Token tidak tersedia. Silakan login kembali.");
        }

        const response = await axios.put(`${MEMBERS_MANAGEMENT_ENDPOINT}/${memberId}`, memberData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Gagal memperbarui member:", error.response || error.message);
        throw new Error("Gagal memperbarui member. Silakan coba lagi.");
    }
}

export async function deleteMember(memberId) {
    try {
        const token = localStorage.getItem("access_token");

        if (!token) {
            throw new Error("Token tidak tersedia. Silakan login kembali.");
        }

        const response = await axios.delete(`${MEMBERS_MANAGEMENT_ENDPOINT}/${memberId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Gagal menghapus member:", error.response || error.message);
        throw new Error("Gagal menghapus member. Silakan coba lagi.");
    }
}
