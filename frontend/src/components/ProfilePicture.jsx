import { useAuthStore } from "../store/useAuthStore.js";
export const ProfilePicture = () => {

    const { authUser } = useAuthStore();
    const image = authUser?.profilePic || "https://via.placeholder.com/150";
    return(
       <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
      <img
        src={image}
        alt="Profile"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
    )};

export default ProfilePicture;