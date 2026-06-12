import {useAuthStore} from "../store/useAuthStore.js";
import {useChatStore} from "../store/useChatStore.js";
import {useEffect} from "react";
import NoChatsFound from "./NoChatsFound.jsx";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx";

const ChatsList = () => {
   const { chats, setSelectedChat, isUsersLoading, getMyChatPartners} = useChatStore();

   useEffect(() => {
    getMyChatPartners();
   }, [getMyChatPartners]);

     
   if (isUsersLoading) return <UsersLoadingSkeleton/>;
   if(chats.length === 0)return <NoChatsFound/>;

   
   return(chats.map((chat) => (
    <div
      key={chat.chatId}
      className="p-2 rounded-xl hover:bg-[#BB9DD7] cursor-pointer"
  onClick={() => setSelectedChat(chat)}
    >
        <div className="flex items-center gap-3 mb-2">
            <img src = {chat.isGroupChat ? chat.groupPic : chat.user.profilePic} alt={chat.isGroupChat ? chat.groupName : chat.user?.fullName} className="w-10 h-10 rounded-full object-cover" />
      <h3 className="text-lg font-semibold font-pixelify text-white hover:text-[#291832]">{chat.isGroupChat ? chat.groupName : chat.user?.fullName}</h3>
         </div>

      <p className="text-sm font-iosevka text-slate-200">{chat.lastMessage.senderId.fullName} : {chat.lastMessage.text || "No message available"}</p>
      <div className="text-xs text-slate-500 justify-end flex">
        {chat.lastMessage.createdAt && new Date(chat.lastMessage.createdAt).toLocaleTimeString()}
      </div>
    </div>
  )));
};
export default ChatsList;