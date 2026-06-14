import sadseal from '../assets/sadseal.png';
const NoConversationPlaceholder = () => {
    return(

<div className="flex flex-col items-center justify-center w-full px-4 gap-4">
  <img
    src={sadseal}
    alt="Sad Seal"
    className="
      w-1/2
      max-w-100
      min-w-40
      h-auto
      object-contain
    "
  />

  <p className="text-center font-iosevka text-gray-400 text-sm sm:text-base">
    You have no conversations yet.
    <br/>
Select a conversation to start chatting

  </p>
</div>
);}
export default NoConversationPlaceholder;