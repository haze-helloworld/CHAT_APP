import { X } from "lucide-react";

const FriendPanel = ({ closePanel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="
          w-[90%] max-w-2xl
          bg-[#001327]
          border border-[#65407D]
          rounded-3xl
          shadow-2xl
          p-6
          relative
          font-iosevka
        "
      >
        {/* Close Button */}
        <button
          onClick={closePanel}
          className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl text-white text-center mb-8">
          Seal Pal Hub 🦭
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Add Friend */}
          <div className="bg-[#093848] rounded-2xl p-5">
            <h3 className="text-xl text-white mb-4">
              Add Friend
            </h3>

            <p className="text-gray-300 text-sm mb-3">
              Enter your friend's code
            </p>

            <input
              type="text"
              placeholder="e.g. TANVI-4827"
              className="
                w-full
                px-4 py-2
                rounded-xl
                bg-[#001327]
                border border-[#65407D]
                text-white
                outline-none
                focus:border-[#73508F]
              "
            />

            <button
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

          {/* Create Group */}
          <div className="bg-[#093848] rounded-2xl p-5">
            <h3 className="text-xl text-white mb-4">
              Create Group
            </h3>

            <p className="text-gray-300 text-sm mb-3">
              Enter a group name
            </p>

            <input
              type="text"
              placeholder="Seal Squad"
              className="
                w-full
                px-4 py-2
                rounded-xl
                bg-[#001327]
                border border-[#65407D]
                text-white
                outline-none
                focus:border-[#73508F]
              "
            />

            <button
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
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendPanel;