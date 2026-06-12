import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

import ChatHeader from "./ChatHeader.jsx";
import InputMessage from "./InputMessage.jsx";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder.jsx";

const ChatContainer = () => {
  const { selectedChat, messages, getMessagesById } = useChatStore();
  const { authUser } = useAuthStore();

  const bottomRef = useRef(null);

  useEffect(() => {
    if (selectedChat?.chatId) {
      getMessagesById(selectedChat.chatId);
    }
  }, [selectedChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  return (
    <div className="flex flex-col h-full bg-[#291832]">
      <ChatHeader />

      <div
        className="
          flex-1
          overflow-y-auto
          px-5
          py-6
          space-y-4
          bg-gradient-to-b
          from-[#43245E]
            to-[#291832]
        "
      >
        {messages.length === 0 ? (
          <NoChatHistoryPlaceHolder />
        ) : (
          messages.map((message) => {
            const isMe =
              message.senderId._id === authUser._id;

            return (
              <div
                key={message._id}
                className={`chat chat-start flex animate-fadeIn ${
                  isMe
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[75%] ${
                    isMe
                      ? "flex-row-reverse"
                      : ""
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
                      px-4
                      py-3
                      rounded-2xl
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
                            font-sans
                          `
                          : `
                            bg-[#291832]
                            border
                            border-white/10
                            text-[#BB9DD7]
                            rounded-bl-md
                            font-semibold
                            font-sans
                          `
                      }
                    `}
                  >
                    <div className="text-xs opacity-70 mb-1">
                      {isMe
                        ? "You"
                        : message.senderId.fullName}
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

                    <div
                      className="
                        text-[10px]
                        opacity-100
                        mt-2
                        text-right
                      "
                    >
                      {new Date(
                        message.createdAt
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div ref={bottomRef} />
      </div>

      <InputMessage />
    </div>
  );
};

export default ChatContainer;