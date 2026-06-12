
import{SendIcon, ImageIcon} from "lucide-react";
import { useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound.js";
import { useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";

function InputMessage() {
  const [message, setMessage] = useState("");
  const {playRandomKeySound} = useKeyboardSound();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessage, isSoundEnabled} = useChatStore();
  const handleKeyPress = () => {
    playRandomKeySound();
  };

  return (
<div className="w-full p-4 border-t border-white/10 bg-[#291832]/70 rounded-tl-2xl rounded-tr-2xl">
  <div className="relative flex items-center gap-3 bg-[#3D284C]/70 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm">

    <button className =" text-white p-2 rounded-xl bg-[#291832]
        hover:bg-[#3D284C] transition-colors">
      <ImageIcon size={22} />
    </button>

    <input
      type="text"
      placeholder="Send a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="
        flex-1
        bg-[#65407D]/70
        text-[#291832]

        rounded-xl
        px-4 py-2
        focus:outline-none
      "
    />

    <button
      className="
        flex items-center justify-center
        w-10 h-10
        rounded-xl
        bg-[#291832]
        hover:bg-[#3D284C]
        transition-all
      "
    >
      <SendIcon
        size={18}
        className="text-slate-200"
        onClick
      />
    </button>

  </div>
</div>
  )
}

export default InputMessage
