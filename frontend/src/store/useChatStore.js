import {create} from 'zustand';
import axiosInstance from "../libs/axios.js";
import {toast} from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: 'contacts',
    participants: [],
    selectedChat:null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem('isSoundEnabled')) === true,
    isParticipantLoading: false,
    cursor: null,
    toggleSound: () => {
       localStorage.setItem('isSoundEnabled', (!get().isSoundEnabled)); 
       set({isSoundEnabled: !get().isSoundEnabled});
    },

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedChat: (chat) => set({selectedChat: chat}),
    getAllContacts: async () => {
        set({isUsersLoading: true});
        try{
            const response = await axiosInstance.get('message/contacts');
            set({allContacts: response.data.contacts});
            console.log(response.data.contacts);
            console.log("Contacts fetched");

        } catch (error) {
            console.error('Error fetching contacts:', error);
               

        } finally {
            set({isUsersLoading: false});
        }
    },
   getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data.chats });
      console.log(res.data.chats);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
    getAllParticipants: async (chatId) => {
        set({isParticipantLoading: true});
        try{
            const response = await axiosInstance.get(`/message/chats/${chatId}/participants`);
            set({participants: response.data});
        } catch (error) {
            console.error('Error fetching participants:', error);
        } finally {
            set({isParticipantLoading: false});
        }
    },
    getAllMessages: async (chatId) => {
        set({isMessagesLoading: true});
        try{
            const response = await axiosInstance.get(`/message/chats/${chatId}/messages`);
            set({messages: response.data});
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            set({isMessagesLoading: false});
        }
    }


}));