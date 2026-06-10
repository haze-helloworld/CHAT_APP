import { ContactIcon } from "lucide-react"

const NoContactsFound = () => {
    return (
        <div className = "flex flex-col items-center justify-center h-full">
             <div className="w-16 h-16 bg-[#291832] rounded-full flex items-center justify-center">
        <ContactIcon className="w-8 h-8 text-[#D4BDE3]" />
      </div>
        <div className="text-center text-gray-400 mt-4">
            <h2 className="text-slate-200 font-medium mb-1">No Contacts Found</h2>
            <p className="text-slate-400 text-sm px-6 ">Start by adding some Seal Pals to chat with!</p>
        </div>
        <button className="px-4 py-2 mt-2 text-sm text-[#D4BDE3] bg-[#291832] border border-[#D4BDE3] rounded-lg hover:bg-[#D4BDE3] hover:text-[#291832] transition-colors">
            Add Seal Pals
        </button>
        </div>
    );
}
export default NoContactsFound;