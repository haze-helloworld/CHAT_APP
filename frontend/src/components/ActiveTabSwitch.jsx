
const ActiveTabSwitch = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <button className="bg-[#65407D] text-white py-2 px-4 rounded-lg hover:bg-[#73508F]">
        Chats
      </button>
      <button className="bg-[#65407D] text-white py-2 px-4 rounded-lg hover:bg-[#73508F] ml-2">
        Contacts
      </button>
    </div>
  );
};
export default ActiveTabSwitch;