import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import sealMascot from "../assets/seal_mascot.png";
import {User2Icon, MailboxIcon, LockIcon, LoaderIcon} from "lucide-react";
import toast  from "react-hot-toast";

function SignUp() {
  const [formData, setFormData] = useState({fullName : "", email: "", password: ""});
  const {signup , isSigningUp} = useAuthStore();

const handleSubmit = (e) => {
  e.preventDefault();
  signup(formData);
};

  return (
   <div className="min-h-screen flex items-center justify-center transparent p-4">
  <div className="w-full max-w-5xl bg-[#281730] rounded-2xl shadow-lg overflow-hidden flex ">

    <div className="w-full md:w-1/2 p-8">
      <h1 className="text-3xl font-bold font-pixelify text-center  mb-6">
        Create Your SealChat Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className = "flex items-center gap-2 mb-1">
            <User2Icon className="w-4 h-4" />
            <label className="text-sm font-medium font-iosevka">
              Full Name
            </label>
          </div>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-[#4b3d52] focus:ring-white-500 font-light font-iosevka"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <MailboxIcon className="w-4 h-4" />
            <label className="text-sm font-medium font-iosevka">
                Email Address
            </label>
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-[#4b3d52] focus:ring-white-500 font-light font-iosevka"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
          <LockIcon className="w-4 h-4" />
          <label className="text-sm font-medium font-iosevka">
            Password
          </label>
          </div>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Create a password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-[#4b3d52] focus:ring-white-500 font-light font-iosevka"
          />
        </div>

        <button
          type="submit"
          disabled={isSigningUp}
          className="w-full bg-[#907fb8] text-[#292832] py-2 rounded-lg hover:bg-[#683064] hover:text-[#907fb8] transition-colors duration-300 disabled:opacity-50 font-iosevkaSS"
        >
          {isSigningUp ? <LoaderIcon className= "w-full h-5 text-center animate-spin" /> : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-4 text-white-600 font-iosevka">
        Already have an account?
        <a href="/login" className="text-[#907fb8] ml-1 hover:underline">
          Login
        </a>
      </p>
    </div>

    
    <div className="hidden md:block md:w-1/2">
      <img
        src={sealMascot}
        alt="Signup"
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</div>
  );
}
export default SignUp;