import axios from 'axios';
import {API_BASE_URL, LOGIN_ENDPOINT} from "@/constants/apiRoutes";

axios.defaults.withCredentials = true;

export default class AuthServices {
    /**
     * Mengirim permintaan login ke server.
     * @param {string} email - Email pengguna.
     * @param {string} password - Kata sandi pengguna.
     * @returns {Promise<object>} - Data respons dari server.
     * @throws {Error} - Error jika permintaan gagal atau validasi gagal.
     */
    static async login(email, password) {
        try {
            this.validateLoginInputs(email, password);
            const response = await axios.post(
                `${API_BASE_URL}${LOGIN_ENDPOINT}`,
                {email, password},
                {
                    headers: {'Content-Type': 'application/json'},
                    timeout: 3000,
                }
            );

            return this.handleLoginResponse(response.data);
        } catch (error) {
            const message = 'Login gagal. Periksa kembali kredensial Anda.';

            if (process.env.NODE_ENV === 'development') {
                console.error('Error Details:', error.response || error.message);
            }

            throw new Error(message);
        }
    }

    /**
     * Menangani respons login.
     * @param {object} data - Data respons dari server.
     * @returns {object} - Data pengguna jika berhasil login.
     * @throws {Error} - Error jika login gagal.
     */
    static handleLoginResponse(data) {
        if (data?.status === 'success') {
            return {user: data.data};
        } else {
            throw new Error(data?.message || 'Login gagal.');
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
            throw new Error('Email dan password harus diisi.');
        }
        if (!this.isValidEmail(email)) {
            throw new Error('Format email tidak valid.');
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
}
