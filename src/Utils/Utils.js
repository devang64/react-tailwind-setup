import axios from 'axios';


export default class Utils {

    static instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Set your base URL here
        timeout: 1000,
        headers: Utils.authHeader(), // Get the auth headers dynamically
    });

    static authHeader() {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            return { Authorization: 'Bearer ' + token };
        } else {
            return {};
        }
    }
    static setTokenOnLocal = (token) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
    };

    static getTokenFromLocal = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null; 
    };

    static async handleRequest(request) {
        try {
            const response = await request();
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error.response?.data || { status: false, message: 'Unknown error occurred' };
            } else {
                throw { status: false, message: 'An unexpected error occurred' };
            }
        }
    }


}