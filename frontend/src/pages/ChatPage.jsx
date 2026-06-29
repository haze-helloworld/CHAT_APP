import { useChatStore } from "../store/useChatStore";

import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import AddFriendButton from "../components/AddFriendButton";
function ChatPage() {
  const { activeTab, selectedChat } = useChatStore();

  return (
    <div className="min-h-screen transparent flex items-center justify-center p-6">
      <div
        className="
          w-full
          max-w-7xl
          h-[90vh]
          bg-[#2A123D]
          border
          border-[#65407D]
          rounded-[40px]
          shadow-[0_20px_50px_rgba(0,0,0,0.4)]
          p-6
          flex
          gap-4
          
        "
      >
        
        <div
          className= {`
          
            lg:w-87.5
            bg-[#43245E]
            border
            border-[#73508F]
            rounded-4xl
            flex
            flex-col
            overflow-hidden
            shadow-lg
           
              ${selectedChat ? "hidden lg:flex w-full" : "flex w-full"}
            
           
          `}
        >
          <ProfileHeader />

        <AddFriendButton />
          <div className="px-4 ">
            <ActiveTabSwitch />
          </div>

          <div className="flex-1 overflow-y-auto p-4 ">
            {activeTab === "chats" ? (
              <ChatsList />
            ) : (
              <ContactList />
            )}
          </div>
        </div>
            <div
        
  className={`
    bg-[#43245E]
    border border-[#73508F]
    rounded-4xl
    overflow-hidden
    shadow-lg
    ${selectedChat ? "flex-1" : "hidden lg:flex lg:flex-1"}
  `}>
          {selectedChat ? (
            <ChatContainer />
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;