import {useState, useRef} from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import {useChatStore} from "../store/useChatStore.js";
import ProfilePicture from "./ProfilePicture.jsx";
import clickSound from "../assets/sounds/mouse-click.mp3";
import {LogOutIcon, VolumeOffIcon, Volume2Icon} from "lucide-react";
const ProfileHeader = () => {
    const {logout, authUser} = useAuthStore();
    const {isSoundEnabled, toggleSound} = useChatStore();
    const mouseClickSound = new Audio(clickSound);
    return(
        <div>
        <div className="flex items-center gap-4 p-4 bg-[#65407D] flex-row justify-between">
            
           <div className="flex items-center gap-4 ">
            <ProfilePicture  />
            <div className="flex flex-col">
            <h2 className="text-xl font-bold font-pixelify text-white truncate">
                {authUser.fullName}
            </h2>
            <p className="text-slate-300 text-xs">Online</p>
            <p className="text-slate-400 text-xs">Friend Code : {authUser.friendCode}</p>
            </div>
           </div>
            <div className="flex items-center gap-2">
                <button 
                    className= "text-slate-400 hover:text-slate-200 transition-colors"
                     onClick={ ()=> {
                        mouseClickSound.currentTime = 0;
                        mouseClickSound.play().catch((error) => console.log("Error playing sound:", error));
                        toggleSound();  
                    }}>
                    {
                        isSoundEnabled ? <Volume2Icon className="text-white" /> : <VolumeOffIcon className="text-white" />
                    }
                </button>
                <LogOutIcon onClick={logout} className="text-white" />
            </div>
        </div>
</div>
    )
}
export default ProfileHeader;