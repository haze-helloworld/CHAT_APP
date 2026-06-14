
import{SendIcon, ImageIcon, XCircleIcon} from "lucide-react";
import { useState } from "react";
import useKeyBoardSound from "../hooks/useKeyBoardSound.js";
import { useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { toast } from "react-hot-toast";


function InputMessage() {
  const [message, setMessage] = useState("");
  const {playRandomKeySound} = useKeyBoardSound();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessage, isSoundEnabled} = useChatStore();
  const handleKeyPress = () => {
    playRandomKeySound();
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() && !imagePreview) return;
    if (isSoundEnabled) {
    playRandomKeySound();
   }
    sendMessage({ text: message, mediaUrl: imagePreview, messageType: (imagePreview ? "image" : "text") });
    setMessage("");
    setImagePreview("");
    if(fileInputRef.current){
      fileInputRef.current.value = "";
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file");
      return;
    }
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImagePreview(reader.result);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if(fileInputRef.current){
      fileInputRef.current.value = "";
    }
  };



  return (
    
<div className="w-full p-4 border-t border-white/10 bg-[#291832]/70 rounded-tl-2xl rounded-tr-2xl">
  <div className="relative flex items-center gap-3 bg-[#3D284C]/70 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
    <form onSubmit={handleSendMessage} className="flex items-center gap-3 w-full">
    {
      imagePreview && (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
          <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
          <button
            className="absolute top-1 right-1 bg-transparent text-white rounded-full p-1"
            onClick={handleRemoveImage}
          >
            <XCircleIcon/>
          </button>
        </div>
      )
    }
    
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
  
    <button onClick={() => fileInputRef.current?.click()} className =" text-white p-2 rounded-xl bg-[#291832]
        hover:bg-[#3D284C] transition-colors">
      <ImageIcon size={22} />
     
    </button>

    <input
      type="text"
      placeholder="Send a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => {isSoundEnabled && playRandomKeySound()}}
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
        onClick = {(e) => handleSendMessage(e)}
      />
    </button>
</form>
  </div>
</div>
  )
}

export default InputMessage
