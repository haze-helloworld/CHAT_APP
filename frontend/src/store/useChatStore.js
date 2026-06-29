import {create} from 'zustand';
import axiosInstance from "../libs/axios.js";
import {toast} from "react-hot-toast";
import {useAuthStore} from "./useAuthStore.js";
import notificationSoundFile from '../assets/sounds/notify.mp3';
const NotificationSound = new Audio(notificationSoundFile);

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
  const authUser = useAuthStore.getState().authUser;

  const tempMessage = {
    _id: `temp-${Date.now()}`,
    senderId: authUser,
    content: {
      text: messageData.text,
      mediaUrl: messageData.mediaUrl
    },
    messageType: messageData.messageType || "text",
    createdAt: new Date().toISOString(),
    isOptimistic: true
  };

  set((state) => ({
    messages: [...state.messages, tempMessage]
  }));

  try {
    const response = await axiosInstance.post(
      `/message/chats/${get().selectedChat?.chatId}/messages`,
      messageData
    );

    set((state) => ({
      messages: state.messages.map((msg) =>
        msg._id === tempMessage._id
          ? response.data.data
          : msg
      )
    }));

    return response.data.data;

  } catch (error) {
    set((state) => ({
      messages: state.messages.filter(
        (msg) => msg._id !== tempMessage._id
      )
    }));

    console.error("Error sending message:", error);
    throw error;
  }
},
 subscribeToNewMessages : () => {
  const {selectedChat, isSoundEnabled} = get();

  if(!selectedChat) return;

  
  const socket = useAuthStore.getState().socket;

if (!socket) {
  console.log("Socket not connected yet");
  return;
}
  socket.on("newMessage", (newMessage) => {
    if(newMessage.chatId !== selectedChat.chatId) return;

    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
  }
  )
  
  if(isSoundEnabled){
    NotificationSound.currentTime = 0;
    NotificationSound.play().catch(error => console.error("Error playing notification sound:", error));
  }
 },

 unsubscribeFromNewMessages : () => {
  const socket = useAuthStore.getState().socket;
  socket.off("newMessage");
 }

}))