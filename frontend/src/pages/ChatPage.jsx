import { useChatStore } from "../store/useChatStore";

import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

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
          className="
            w-80
            bg-[#43245E]
            border
            border-[#73508F]
            rounded-[32px]
            flex
            flex-col
            overflow-hidden
            shadow-lg
          "
        >
          <ProfileHeader />

          <div className="px-4 pt-2">
            <ActiveTabSwitch />
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "chats" ? (
              <ChatsList />
            ) : (
              <ContactList />
            )}
          </div>
        </div>

        {/* RIGHT CHAT PANEL */}
        <div
          className="
            flex-1
            bg-[#43245E]
            border
            border-[#73508F]
            rounded-[32px]
            overflow-hidden
            shadow-lg
          "
        >
          {selectedUser ? (
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