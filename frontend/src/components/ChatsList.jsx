import {useAuthStore} from "../store/useAuthStore.js";
import {useChatStore} from "../store/useChatStore.js";
import {useEffect} from "react";
import NoChatsFound from "./NoChatsFound.jsx";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx";

const ChatsList = () => {
   const {getAllChats, chats, setSelectedChat, isUsersLoading} = useChatStore();
  
   useEffect(() => {
       getAllChats();
   }, [getAllChats]);

   if (isUsersLoading) return <UsersLoadingSkeleton/>;
   if(chats.length === 0)return <NoChatsFound/>;


   return(chats.map((chat) => (
    <div
      key={chat.id}
      className="p-4 hover:bg-[#3D284C] cursor-pointer"
      onClick={() => setSelectedChat(chat)}
    >
        <div className="flex items-center gap-3 mb-2">
            <img src = {chat.profileImage} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
      <h3 className="text-lg font-semibold text-white">{chat.name}</h3>
         </div>
      <p className="text-sm text-slate-400">{chat.lastMessage}</p>
    </div>
  )));
};
export default ChatsList;