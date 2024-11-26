import axios from 'axios';
import { API_BASE_URL, LOGIN_ENDPOINT } from "@/constants/apiRoutes";

export default class AuthServices {
    /**
     * Sends a login request to the server.
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     * @returns {Promise<object>} - Response data from the server.
     * @throws {Error} - Throws error if request fails or validation fails.
     */
    static async login(email, password) {
        try {
            if (!email || !password) {
                throw new Error('Both email and password are required.');
            }
            if (!this.isValidEmail(email)) {
                throw new Error('Invalid email format.');
            }

            const response = await axios.post(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
                email,
                password
            }, { headers: { 'Content-Type': 'application/json' } });

            if (response.data && response.data.status === 'success') {
                const { access_token, refresh_token, data } = response.data;

                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                localStorage.setItem('user', JSON.stringify(data));

                return { access_token, refresh_token, user: data };
            } else {
                throw new Error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                console.error('No Response from Server:', error.request);
            } else {
                console.error('Request Error:', error.message);
            }

            throw error;
        }
    }

    /**
     * Validates an email address.
     * @param {string} email - The email address to validate.
     * @returns {boolean} - True if valid, false otherwise.
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}