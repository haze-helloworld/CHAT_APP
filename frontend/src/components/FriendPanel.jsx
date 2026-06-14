import { useState } from "react";
import { X, UserPlus, Users, PlusIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { useChatStore } from "../store/useChatStore.js";
import { useRef } from "react";

const FriendPanel = ({ closePanel }) => {
  const [activeTab, setActiveTab] = useState("friend");
  const [groupName, setGroupName] = useState("");
  const [participantInput, setParticipantInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [selectedImage,setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const {createGroup, addFriend} = useChatStore();
  
const addParticipant = () => {
  if (!participantInput.trim()) return;

  setParticipants((prev) => [...prev, participantInput.trim()]);
  setParticipantInput("");
};

const removeParticipant = (index) => {
  setParticipants((prev) =>
    prev.filter((_, i) => i !== index)
  );
};

const handleCreateGroup = () => {
   if(!profilePic) return toast.error("Please select a group picture");
    const reader = new FileReader();
    reader.readAsDataURL(profilePic);
    reader.onloadend = async() => {
      const base64Image = reader.result
      setSelectedImage(base64Image);
    };
  if (!groupName.trim()) toast.error("Group name cannot be empty");
  else if (participants.length === 0) toast.error("Add at least one participant");
  else {
    createGroup(groupName, participants, selectedImage);
   
    setGroupName("");
    setParticipants([]);
  }
}

const handleAddFriend = () => {
  if(!participantInput.trim()) return toast.error("Friend code cannot be empty");
  
  addFriend(participantInput.trim());
  setParticipantInput("");
}

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div
      className="
        w-[90%] max-w-2xl
        bg-[#65407D]
        border border-[#65407D]
        rounded-3xl
        shadow-2xl
        p-6
        relative
        
      "
    >
      {/* Close Button */}
      <button
        onClick={closePanel}
        className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
      >
        <X size={24} />
      </button>

      <h2 className="text-3xl font-pixelify text-white text-center mb-8">
        Seal Pal Hub
      </h2>

      {/* Tab Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("friend")}
          className={`
            flex-1 flex items-center justify-center gap-2
            py-3 rounded-xl transition-all
            ${
              activeTab === "friend"
                ? "bg-[#BB9DD7] text-white"
                : "bg-[#291832] text-gray-300 hover:bg-[#3D284C]"
            }
          `}
        >
          <UserPlus size={18} />
          Add Friend
        </button>

        <button
          onClick={() => setActiveTab("group")}
          className={`
            flex-1 flex items-center justify-center gap-2
            py-3 rounded-xl transition-all
            ${
              activeTab === "group"
                ? "bg-[#BB9DD7] text-white"
                : "bg-[#291832] text-gray-300 hover:bg-[#3D284C]"
            }
          `}
        >
          <Users size={18} />
          Create Group
        </button>
      </div>

      {/* Add Friend Panel */}
      {activeTab === "friend" && (
        <div className="bg-[#3D284C] rounded-2xl p-5 animate-in fade-in duration-200">
          <h3 className="text-xl text-white mb-4">Add Friend</h3>

          <p className="text-gray-300 text-sm mb-3">
            Enter your friend's code
          </p>

          <input
            type="text"
            value={participantInput}
            onChange={(e) => setParticipantInput(e.target.value)}
            placeholder="e.g. JSNJ4827"
            className="
              w-full
              px-4 py-2
              rounded-xl
              bg-[#291832]
              border border-[#65407D]
              text-white
              outline-none
              focus:border-[#73508F]
            "
          />

          <button
            onClick={handleAddFriend}
            className="
              mt-4
              w-full
              bg-[#65407D]
              text-white
              py-2
              rounded-xl
              hover:bg-[#73508F]
              transition-colors
            "
          >
            Send Friend Request
          </button>
        </div>
      )}

      {/* Create Group Panel */}
     {activeTab === "group" && (
  <div className="bg-[#3D284C] rounded-2xl p-6 flex flex-col gap-5 animate-in fade-in duration-200">
    <h3 className="text-xl text-white">Create Group</h3>

    {/* Group Name */}
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">
        Enter a group name
      </label>

      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Seal Group Name"
        className="
          w-full
          px-4 py-3
          rounded-xl
          bg-[#291832]
          border border-[#65407D]
          text-white
          outline-none
          focus:border-[#BB9DD7]
        "
      />
    </div>

    {/* Group Picture */}
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">
        Group Picture
      </label>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="
          bg-[#65407D]
          text-white
          py-3
          rounded-xl
          hover:bg-[#73508F]
          transition-colors
        "
      >
        {profilePic ? "Change Image" : "Select Image"}
      </button>

      {profilePic && (
        <span className="text-xs text-green-300">
          {profilePic.name}
        </span>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => setProfilePic(e.target.files[0])}
      />
    </div>

    {/* Participants */}
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">
        Add Participants
      </label>

      <div className="relative">
        <input
          type="text"
          value={participantInput}
          onChange={(e) => setParticipantInput(e.target.value)}
          placeholder="Friend Code"
          className="
            w-full
            px-4 py-3
            rounded-xl
            bg-[#291832]
            border border-[#65407D]
            text-white
            outline-none
            focus:border-[#BB9DD7]
          "
        />

        <button
          type="button"
          onClick={addParticipant}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-400
            hover:text-white
            transition-colors
          "
        >
          <PlusIcon size={20} />
        </button>
      </div>
    </div>

    {/* Participants List */}
    {participants.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="
              flex items-center gap-2
              bg-[#65407D]
              text-white
              px-3 py-2
              rounded-full
            "
          >
            <span>{participant}</span>

            <button
              onClick={() => removeParticipant(index)}
              className="hover:text-red-300"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    )}

    {/* Create Button */}
    <button
      onClick={handleCreateGroup}
      className="
        w-full
        bg-[#BB9DD7]
        text-white
        py-3
        rounded-xl
        font-medium
        hover:bg-[#c8afe0]
        transition-colors
      "
    >
      Create Group
    </button>
  </div>

      )}
      
      </div>
      </div>)};
export default FriendPanel;