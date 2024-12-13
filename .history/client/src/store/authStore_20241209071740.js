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

    signup: async (name, email, phone, roomNumber, moveIn) => {
        set({ isLoading: true })
        try {

            const response = axios.post(`${API_URL}/signups`, { name, email, phone, roomNumber, moveIn });
            set({ user: response.data.user, isAuthenticated: true, error: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });  // Error: show error message
            throw error;
        }
    }
}))