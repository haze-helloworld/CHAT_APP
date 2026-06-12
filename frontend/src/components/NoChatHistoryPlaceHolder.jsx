import React from 'react'
import mailSeal from "../assets/mail_seal.png";

function NoChatHistoryPlaceHolder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <img src = {mailSeal} alt="Mail Seal" className="  w-1/2
      max-w-[300px]
      min-w-[120px]
      h-auto
      object-contain"/>
      <p className="text-slate-400 font-iosevka">No chat history yet.</p>
    </div>
  )
}

export default NoChatHistoryPlaceHolder
