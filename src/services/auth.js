import axios from "axios";
import {LOGIN, LOGOUT, REFRESH} from "@/constants/routesAPI";

export default class AuthServices {
    static async login(email, password) {
        try {
            this.validateLoginInputs(email, password);

            const response = await axios.post(LOGIN, {email, password}, {
                headers: {"Content-Type": "application/json"},
                timeout: 3000,
            });

            const {access_token, refresh_token} = response.data.data;

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            localStorage.setItem("user_email", email);

            return response.data;
        } catch (error) {
            console.error("Login gagal:", error.response || error.message);
            throw new Error("Login gagal. Periksa kembali kredensial Anda.");
        }
    }

    static async logout() {
        try {
            await axios.post(LOGOUT, {}, {withCredentials: true});
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        } catch (error) {
            console.error("Logout gagal:", error.response || error.message);
            throw new Error("Logout gagal. Silakan coba lagi.");
        }
    }

    static async refreshAccessToken() {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
            throw new Error("Refresh token tidak tersedia. Silakan login kembali.");
        }

        try {
            const response = await axios.post(REFRESH, {refresh_token: refreshToken}, {
                headers: {"Content-Type": "application/json"},
            });

            const {access_token} = response.data;

            localStorage.setItem("access_token", access_token);

            return access_token;
        } catch (error) {
            console.error("Gagal refresh token:", error.response || error.message);
            throw new Error("Sesi Anda telah berakhir. Silakan login kembali.");
        }
    }

    static validateLoginInputs(email, password) {
        if (!email || !password) {
            throw new Error("Email dan password harus diisi.");
        }
        if (!this.isValidEmail(email)) {
            throw new Error("Format email tidak valid.");
        }
    }

    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static getAccessToken() {
        return localStorage.getItem("access_token");
    }

    static isAccessTokenValid() {
        const token = this.getAccessToken();
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiration = payload.exp;
            return Date.now() / 1000 < expiration;
        } catch (e) {
            return false;
        }
    }
}

axios.interceptors.request.use(
    (config) => {
        const token = AuthServices.getAccessToken();
        if (token && AuthServices.isAccessTokenValid()) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await AuthServices.refreshAccessToken();
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token gagal, logout pengguna.");
                await AuthServices.logout();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);