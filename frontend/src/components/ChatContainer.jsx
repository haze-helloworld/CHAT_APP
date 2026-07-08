import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ParticipantWindow from "./participantWindow.jsx";
import ChatHeader from "./ChatHeader.jsx";
import InputMessage from "./InputMessage.jsx";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";
import DateDivider from "./DateDivider.jsx";
import { useState } from "react";

const ChatContainer = () => {
const { selectedChat, messages, getMessagesById, isMessagesLoading} = useChatStore();
  const { authUser } = useAuthStore();
  const [showParticipantWindow, setShowParticipantWindow] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (selectedChat?.chatId) {
      getMessagesById(selectedChat.chatId);
    }
  }, [selectedChat, getMessagesById]);

  useEffect(() => {
    if(bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);


  return (
    <div className="flex flex-col h-full bg-[#291832]">
      <ChatHeader  onShowParticipants={() => setShowParticipantWindow(true)} />


       {showParticipantWindow && (
      <ParticipantWindow
      
        selectedchat={selectedChat}
        onClose={() => setShowParticipantWindow(false)}
      />
    )}

      <div
        className="
          flex-1
          overflow-y-auto
          px-5
          py-6
          space-y-4
          bg-linear-to-b
          from-[#43245E]
            to-[#291832]
        "
      >
       
    {messages.length > 0 && !isMessagesLoading ? (
  messages.map((message, index) => {
    const isMe = message.senderId._id === authUser._id;

    const previousMessage = messages[index - 1];

    const showDateDivider =
      !previousMessage ||
      new Date(previousMessage.createdAt).toDateString() !==
        new Date(message.createdAt).toDateString();
    return (
      <div key={message._id}>
        {showDateDivider && (
          <DateDivider date={message.createdAt} />
        )}

      

        <div
          className={`chat flex animate-fadeIn ${
            isMe
              ? "chat-end justify-end"
              : "chat-start justify-start"
          }`}
        >
          <div
            className={`flex gap-3 max-w-[75%] ${
              isMe ? "flex-row-reverse" : ""
            }`}
          >
            <img
              src={message.senderId.profilePic}
              alt={message.senderId.fullName}
              className="
                w-10
                h-10
                rounded-full
                object-cover
                border
                border-white/20
                shadow-lg
                chat-image
              "
            />

            <div
              className={`
                chat-bubble relative
                backdrop-blur-lg
                shadow-xl
                transition-all
                duration-200
                hover:scale-[1.02]
                ${
                  isMe
                    ? `
                      bg-[#BB9DD7]
                      text-[#291832]
                      border-white/10
                      rounded-br-md
                      font-semibold
                    `
                    : `
                      bg-[#291832]
                      border
                      border-white/10
                      text-[#BB9DD7]
                      rounded-bl-md
                      font-semibold
                    `
                }
              `}
            >
              <div className="text-xs opacity-70 mb-1">
                {isMe ? "You" : message.senderId.fullName}
              </div>

              {message.content?.text && (
                <p className="leading-relaxed break-words">
                  {message.content.text}
                </p>
              )}

              {message.content?.mediaUrl && (
                <img
                  src={message.content.mediaUrl}
                  alt="attachment"
                  className="
                    mt-3
                    rounded-xl
                    max-h-72
                    object-cover
                    border
                    border-white/10
                  "
                />
              )}

              <div className="text-[10px] mt-2 text-right opacity-80">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })
  
) : isMessagesLoading ? (
  <MessagesLoadingSkeleton />
) : (
  <NoChatHistoryPlaceHolder />
)}
 <div ref={bottomRef} />
        
      </div>

      <InputMessage />
    </div>
  );
};

export default ChatContainer;