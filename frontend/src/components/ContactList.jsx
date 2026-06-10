
import {useChatStore} from "../store/useChatStore.js";
import {useEffect} from "react";
import NoContactsFound from "./NoContactsFound.jsx";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx";

const ContactsList = () => {
    const {getAllContacts, allContacts, isUsersLoading, setSelectedChat} = useChatStore();
    useEffect(() => {
        getAllContacts();
    }, [getAllContacts]);

       if (isUsersLoading) return <UsersLoadingSkeleton/>;
       if(allContacts.length === 0)return <NoContactsFound/>;
    return(allContacts.map((contact) => (
    <div
      key={contact.chat._id}
      className="p-4 hover:bg-[#3D284C] cursor-pointer"
      onClick={() => setSelectedChat(contact)}
    >
        <div className="flex items-center gap-3 mb-2">
            <img src = {contact.user.profilePic} alt={contact.user.fullName} className="w-10 h-10 rounded-full object-cover" />
      <h3 className="text-lg font-semibold text-white">{contact.user.fullName}</h3>
         </div>

    </div>
  )));
};

export default ContactsList;