import { useState } from "react";
import sealPal from "../assets/sealPal.png";
import FriendPanel from "./FriendPanel";
const AddFriendButton = () => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <div className="px-4 py-2 flex justify-center items-center">
        <button
          className="bg-[#65407D] text-white py-2 px-4 rounded-full hover:bg-[#73508F] transition-colors font-iosevka"
          onClick={() => setShowPanel(true)}
        >
          <img
            src={sealPal}
            alt="Seal Pal"
            className="w-12 h-auto inline"
          />
          Add Seal Pal
        </button>
      </div>

      {showPanel && (
        <FriendPanel closePanel={() => setShowPanel(false)} />
      )}
    </>
  );
};

export default AddFriendButton;

