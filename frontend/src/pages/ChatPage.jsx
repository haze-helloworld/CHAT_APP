function ChatPage() {
  return (
   <div className="w-full h-screen flex items-center justify-center">
      <div className="
        w-3/4 h-3/4
        bg-white/10 
        backdrop-blur-sm 
        border border-white/20 
        rounded-2xl 
        shadow-xl
        flex items-center
      ">
        <div className = "
        w-2/5 h-full
        bg-pink-200/35
        backrop-blur-sm
        border border-pink-300/50
        rounded-lg
        shadow-lg
        ">
            <h1 className="text-2xl bg-pink-300/55 text-black rounded-xl font-bold text-center mt-10 font-mono ">CHAT LIST</h1>

        </div>
      </div>
    </div>
  );
}
export default ChatPage;