import {create} from 'zustand';
import axiosInstance from '../libs/axios';
import toast from 'react-hot-toast';
import {io} from 'socket.io-client';
import {useChatStore} from './useChatStore.js';
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : window.location.origin;

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            set({ authUser: response.data});
            get().connectSocket();
        }
        catch (error) {
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
            get().connectSocket();
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
         get().connectSocket();
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
            get().disconnectSocket();
            toast.success("Logged out successfully! See you next time!");
        }
        catch(error){
            toast.error("Error logging out. Please try again.");
            console.error("Error in logout:", error);
        }
    },

    updateProfile: async (data) => {
        try{
            const response = await axiosInstance.put('/auth/update-profile', data);
          set({ authUser: response.data.user});
            toast.success("Profile updated successfully!");
        }
        catch(error){
            toast.error("Error updating profile." );
            console.error("Error in updateProfile:",  error.response?.data , error);
        }
    },
    connectSocket: () => {
        const {authUser, socket: existingSocket} = get();

        if(!authUser || existingSocket?.connected) return;

        if(existingSocket){
            existingSocket.connect();
            return;
        }
        const socket = io(BASE_URL, {
            withCredentials: true,
            
        })

      
        set({ socket });

        socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
            useChatStore.getState().subscribeToNewMessages();
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  socket.on("getOnlineUsers", (userIds) => {
    set({ onlineUsers: userIds });
  });
        

    },
    disconnectSocket: () => {
       if(get().socket){
        get().socket.disconnect();
        set({ socket: null, onlineUsers: [] });
       }
    }
}));
