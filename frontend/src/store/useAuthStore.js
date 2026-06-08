import {create} from 'zustand';
import axiosInstance from '../libs/axios';
import toast from 'react-hot-toast';
export const useAuthStore = create((set,get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            set({ authUser: response.data});
        }
        catch (error) {
            console.log("Error in authCheck:", error);
            set({ authUser: null});
        }
        finally{
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            set({ authUser: response.data});

        toast.success("Account create successfully! Welcome aboard!");
        }
        catch (error) {
            toast.error(error.response.data.message);
           console.error("Error in signup:", error);
            console.log(error.response?.data);
        }
        finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({ authUser: response.data});

        toast.success("Logged in successfully! Welcome back!");
        }
        catch (error) {
           toast.error(error.response.data.message);
           console.error("Error in login:", error);
          
        }
        finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try{
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully! See you next time!");
        }
        catch(error){
            toast.error("Error logging out. Please try again.");
            console.error("Error in logout:", error);
        }
    }
}));

