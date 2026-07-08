import {XIcon} from "lucide-react";
const ParticipantWindow = ({ selectedchat, onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div
        className="
          relative
          w-[92%]
          max-w-xl
          max-h-[80vh]
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-gradient-to-br from-[#65407D] to-[#3E224F]
          shadow-[0_20px_80px_rgba(0,0,0,0.45)]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Participants
            </h2>
            <p className="mt-1 text-sm text-[#D8C6E8]">
              {selectedchat?.participants?.length || 0} Members
            </p>
          </div>

          <button
            onClick={onClose}
            className=
             "absolute top-4 right-4 text-white hover:text-red-400 transition-colors">
            <XIcon/>
          </button>
        </div>

        {/* Participant List */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-3">
          {selectedchat?.participants?.map((participant) => (
            <div
              key={participant._id}
              className="
                flex items-center gap-4
                rounded-2xl
                border border-white/10
                bg-[#291832]/80
                p-4
                transition-all
                duration-200
                hover:scale-[1.02]
                hover:bg-[#372144]
              "
            >
              <img
                src={participant.profilePic}
                alt={participant.fullName}
                className="
                  h-14
                  w-14
                  rounded-full
                  border-2
                  border-[#BB9DD7]
                  object-cover
                "
              />

              <div className="flex-1 overflow-hidden">
                <h3 className="truncate font-iosevka text-lg font-semibold text-white">
                  {participant.fullName}
                </h3>

                <p className="truncate text-sm text-gray-300">
                  {participant.email}
                </p>

                <span
                  className="
                    mt-2
                    inline-block
                    rounded-full
                    bg-[#BB9DD7]/20
                    px-3
                    py-1
                    font-iosevka
                    text-xs
                    text-[#E8D6F5]
                  "
                >
                  #{participant.friendCode}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantWindow;