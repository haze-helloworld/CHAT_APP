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

  getMessagesById: async (chatId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/chats/${chatId}/messages`);
      set({ messages: res.data.messages });
      console.log(res.data.messages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
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
    },
    createGroup: async (groupName, participants, profilePic) => {
      try {
        const response = await axiosInstance.post('/message/chats/group', { groupName, participants , profilePic});
        await get().getMyChatPartners();
        toast.success("Group created successfully");  
        return response.data;

      } catch (error) {
        console.error('Error creating group:', error);
        toast.error(error.response?.data?.message || "Something went wrong");
        throw error;
      }
    },

    addFriend: async (friendCode) => {
      try {
        console.log("Adding friend with code:", friendCode);
        const response = await axiosInstance.post('/message/contacts', { friendCode });
        toast.success(response.data.message);
        set(chats => [...chats, { chatId: response.data.chatId, isGroup: false }]);
        set(allContacts => [...allContacts, { userId : friendCode, chatId: response.data.chatId }]);
      } catch (error) {
        console.error('Error adding friend:', error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
    sendMessage: async (messageData) => {
      try {
        //messageData should contain text, mediaUrl, messageType
        const response = await axiosInstance.post(`/message/chats/${get().selectedChat?.chatId}/messages`, messageData);
        set(messages => [...messages, response.data]);
        return response.data;
    
      } catch (error) {
        console.error('Error sending message:', error);
        throw error;
      }}


}));