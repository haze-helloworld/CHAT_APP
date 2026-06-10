
import{ useState } from "react";
import clicksound from "../assets/sounds/mouse-click.mp3";
import { useChatStore } from "../store/useChatStore.js";

const ActiveTabSwitch = () => {
 const {activeTab, setActiveTab, isSoundEnabled} = useChatStore();
 const mouseClickSound = new Audio(clicksound);

 const playClickSound = () => {
  if(!isSoundEnabled) return;
    mouseClickSound.currentTime = 0;
    mouseClickSound.play().catch((error) => console.log("Error playing sound:", error));
 };
return (
  <div className="flex bg-[#291832] p-1 rounded-full w-full">
    <button
      onClick={() => {
        setActiveTab("chats");
        playClickSound();
      }}
      className={`flex-1 py-2 rounded-full transition-transform duration-300 ${
        activeTab === "chats"
          ? "bg-[#65407D] text-white"
          : "text-gray-300"
      }`}
    >
      Chats
    </button>

    <button
      onClick={() => {
        setActiveTab("contacts");
        playClickSound();
      }}
      className={`flex-1 py-2 rounded-full transition-transform duration-300 ${
        activeTab === "contacts"
          ? "bg-[#65407D] text-white"
          : "text-gray-300"
      }`}
    >
      Contacts
    </button>
  </div>
);
};
export default ActiveTabSwitch;