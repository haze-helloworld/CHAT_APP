import { useChatStore } from "../store/useChatStore.js";
import { XCircleIcon } from "lucide-react";
import mouseClickSound from "../assets/sounds/mouse-click.mp3";

function ChatHeader() {
  const { selectedChat, setSelectedChat } = useChatStore();

  const handleClose = () => {
    const clickSound = new Audio(mouseClickSound);
    clickSound.currentTime = 0;
    clickSound.play();

    setSelectedChat(null);
  };

  return (
    <div className="
      flex items-center justify-between
      px-5 py-3
      bg-[#291832]/95
      backdrop-blur-md
      border-b border-white/10
      shadow-md
    ">
     
      <div className="flex items-center gap-4">
        <div className={`relative avatar ${selectedChat.isGroupChat ? 'avatar' : selectedChat.user.status ? 'avatar-online' : 'avatar-offline'}`}>

          <img
            src={selectedChat.isGroupChat ? selectedChat.profileImage : selectedChat.user.profilePic}
            alt={selectedChat.isGroupChat ? selectedChat.name : selectedChat.user.fullName}
            className="
             avatar-online
              w-14 h-14
              rounded-full
              object-cover
              ring-2 ring-purple-400/40
              shadow-lg
            "
          />

        
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl font-semibold font-pixelify text-white">
            {selectedChat.isGroupChat ? selectedChat.name : selectedChat?.user.fullName}
          </h2>

          <p className="text-sm text-gray-400 font-iosevka">
            {selectedChat.isGroupChat ? "Admin : " + selectedChat.admin : selectedChat?.user.status}
          </p>
        </div>


        <div className="
          hidden md:flex
          items-center
          px-3 py-1
          rounded-full
          bg-white/5
          border border-white/10
        ">
          <span className="text-xs font-iosevka text-white/70">
            {selectedChat.isGroupChat ? "Group Code:" : "Friend Code:"}
          </span>

          <span className="ml-2 text-sm font-semibold text-purple-300">
            {selectedChat.isGroupChat ? selectedChat.groupCode : selectedChat?.user.friendCode}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <button
        onClick={() => handleClose()}
        className="
          p-2
          rounded-full
          text-white/70
          hover:text-red-400
          hover:bg-white/10
          transition-all duration-200
          hover:scale-110
          active:scale-95
        "
      >
        <XCircleIcon size={28} />
      </button>
    </div>
  );
}

export default ChatHeader;