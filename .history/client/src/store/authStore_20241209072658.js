import { create } from 'zustand';
import axios from 'axios'

const API_URL = process.env.MODE === "development" ? "http://localhost:5000/auth" : "/auth"

const useAuthStore = create((set) => ({ //a one argument and a callback function 
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isCheckingAuth: true,
    message: null,

    //signup part
    signup: async (name, email, phone, roomNumber, moveIn, password) => {
        set({ isLoading: true })
        try {

            const response = axios.post(`${API_URL}/signups`, { name, email, phone, roomNumber, moveIn, password }); //we sending this to the server
            set({ user: response.data.user, isAuthenticated: true, error: false })//updatyes the state of the useAuthstore 
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });  // Error: show error message
            throw error;
        }
    },

    //login part
    login: async (roomNumber, password) => {
        set({ isLoading: true })
        try {
            const response = axios.post(`${API_URL}/logins`, { roomNumber, password });
            set({ user: response.data.user, isAuthoticated: true, error: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });  // Error: show error message
            throw error;
        }
    },

    //logout part
    logout: async () => {
        try {
            await axios.post(`${API_URL}/logout`)
            set({ user: null, isAuthenticated: false, isCheckingAuth: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });  // Error: show error message
            throw error;
        }
    }
}))

