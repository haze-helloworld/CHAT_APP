import ProfilePicture from "./ProfilePicture.jsx";
import {LogOutIcon} from "lucide-react";
const ProfileHeader = () => {
    return(
        <div className="flex items-center gap-4 p-4 bg-[#65407D] flex-row justify-between">
           <div className="flex items-center gap-4">
            <ProfilePicture />
            <h2 className="text-xl font-bold text-white">User Name</h2>
           </div>
            <LogOutIcon className="text-white" />
        </div>
    )
}
export default ProfileHeader;