import {useAuthStore} from "../store/useAuthStore.js";

const ChatsList = () => {
    const { authUser } = useAuthStore();
    const contacts = authUser?.contacts || [];
    return(
        <div className="flex flex-col gap-4">
        {contacts.map((contact) => (
            <div className="flex items-center gap-4 p-2 bg-[#65407D] rounded-lg hover:bg-[#73508F] cursor-pointer">
              
                 contact.name
                </div>  
           
        ))}
        </div>
    )
}
export default ChatsList;