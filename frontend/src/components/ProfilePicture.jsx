import { useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
const ProfilePicture = () => {
  const { authUser, updateProfile } = useAuthStore();
  const [selectedImage,setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async() => {
      const base64Image = reader.result
      setSelectedImage(base64Image);
      await updateProfile({profilePic: base64Image});
    }
  };


  return (
   <div >
    <button className= "size-14 rounded-full overflow-hidden relative group" onClick={() => fileInputRef.current?.click()}>
    <img src= {selectedImage || authUser.profilePic || "https://via.placeholder.com/150"}  alt = "User Profile Picture"
    className = "  w-14 h-14  rounded-full  object-cover  ring-2  ring-[#3D284C]  ring-offset-2 ring-offset-[#65407D] shadow-lg"/>
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
    </button>
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleImageUpload}
    />
   </div>
  );
};

export default ProfilePicture;