import axios from "axios";
import {LOGIN, LOGOUT, REFRESH} from "@/constants/routesAPI";

export default class AuthServices {
    /**
     * Login pengguna dan menyimpan access serta refresh token di localStorage.
     * @param {string} email - Email pengguna.
     * @param {string} password - Kata sandi pengguna.
     * @returns {Promise<object>} - Data respons dari server.
     * @throws {Error} - Error jika login gagal.
     */
    static async login(email, password) {
        try {
            this.validateLoginInputs(email, password);

            const response = await axios.post(LOGIN, {email, password}, {
                headers: {"Content-Type": "application/json"},
                timeout: 3000,
            });

            const {access_token, refresh_token} = response.data.data;

            // Simpan token di localStorage
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            return response.data;
        } catch (error) {
            console.error("Login gagal:", error.response || error.message);
            throw new Error("Login gagal. Periksa kembali kredensial Anda.");
        }
    }

    /**
     * Logout pengguna, menghapus token dari localStorage.
     * @returns {Promise<void>} - Promise selesai ketika logout berhasil.
     */
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

    /**
     * Refresh access token menggunakan refresh token.
     * @returns {Promise<string>} - Access token baru.
     */
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

            // Simpan access token baru di localStorage
            localStorage.setItem("access_token", access_token);

            return access_token;
        } catch (error) {
            console.error("Gagal refresh token:", error.response || error.message);
            throw new Error("Sesi Anda telah berakhir. Silakan login kembali.");
        }
    }

    /**
     * Validasi input login.
     * @param {string} email - Email pengguna.
     * @param {string} password - Kata sandi pengguna.
     * @throws {Error} - Error jika input tidak valid.
     */
    static validateLoginInputs(email, password) {
        if (!email || !password) {
            throw new Error("Email dan password harus diisi.");
        }
        if (!this.isValidEmail(email)) {
            throw new Error("Format email tidak valid.");
        }
    }

    /**
     * Validasi format email.
     * @param {string} email - Email yang akan divalidasi.
     * @returns {boolean} - True jika format valid, false jika tidak.
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Mendapatkan access token dari localStorage.
     * @returns {string|null} - Access token, atau null jika tidak ada.
     */
    static getAccessToken() {
        return localStorage.getItem("access_token");
    }

    /**
     * Memeriksa apakah access token valid.
     * @returns {boolean} - True jika valid, false jika tidak.
     */
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

        // Jika token kadaluarsa (401)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await AuthServices.refreshAccessToken();
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token gagal, logout pengguna.");
                AuthServices.logout();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
