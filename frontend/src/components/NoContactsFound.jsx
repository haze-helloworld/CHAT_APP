import { ContactIcon } from "lucide-react"

const NoContactsFound = () => {
    return (
        <div className = "flex flex-col items-center justify-center h-full">
            <ContactIcon className="w-16 h-16 text-gray-400" />
           
        <div className="text-center text-gray-400 mt-10">
            <h2>No Contacts Found</h2>
            <p>It looks like you don't have any contacts yet. Start by adding some Seal Pals to chat with!</p>
        </div>
        <button className="bg-[#65407D] hover:bg-[#73508F] text-white py-2 px-4 rounded-lg">
            Add Seal Pals
        </button>
        </div>
    );
}
export default NoContactsFound;