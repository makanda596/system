import { create } from 'zustand';
import axios from 'axios'

// const API_URL = process.env.MODE === "development" ? "http://localhost:5000/auth" : "/auth"
const API_URL = "http://localhost:5000/auth"

export const useAuthStore = create((set) => ({ //a one argument and a callback function 
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isCheckingAuth: true,
    message: null,

    //signup part
    signup: async (name, email, phone, roomNumber, moveIn, password) => {
        set({ isLoading: true, error: null })
        try {

            const response = await axios.post(`${API_URL}/signup`, { name, email, phone, roomNumber, moveIn, password }); //we sending this to the server
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })//updatyes the state of the useAuthstore 
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });  // Error: show error message
            throw error;
        }
    },

    //login part
    login: async (roomNumber, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post("http://localhost:5000/auth/login", { roomNumber, password });
            set({ user: response.data.user, isAuthenticated: true, error: null, isLoading: false })
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
    },

    //sending reset-password 
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error sending reset password email",
            });
            throw error;
        }
    },

    //reset password
    resetPassword: async (token, password) => {
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, password);
            set({ message: response.data.message })
        } catch (error) {

        }
    },

    //verfy email
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code })
            set({ user: response.data.user, isAuthenticated: true })
            return response.data;
        } catch (error) {

        }
    },

    //chechking authoticTED users
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const token = localStorage.getItem("token"); // Retrieve the token from local storage
            const response = await axios.get("http://localhost:5000/auth/check-auth", {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                },
                withCredentials: true, // Ensure cookies are sent along with the request
            });

            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            console.error("Error in checkAuth: ", error.response?.data || error.message);
            set({
                isAuthenticated: false,
                isCheckingAuth: false,
                error: error.response?.data?.message || "Failed to authenticate",
            });
        }


    }))



// //response.data.user== response.data.{
// user: {
//     email:smksnidn@gmail.com,
//     name:brian,
//     password:mdmd,
// }
// // }
