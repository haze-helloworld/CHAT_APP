import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type : String,
        required : true
    },
    contacts : [ {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatRoom",
      },
        isGroupChat: {
    type: Boolean,
    default: false
  },
  groupName: String,
  groupPic: String
    },],
    email:{
        type : String,
        required : true,
        unique: true,},
    password:{
        type : String,
        required : true,
        unique: true,
        minLength: 6,
    },
    profilePic:{
        type : String, 
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    status : {
        type : String,
        enum : ['online', 'offline', 'away'],
        default : 'offline'
    },
    friendCode :{
        type: String,
        unique: true,
        index: true

    }
},
{timestamps:true}
);


const User = mongoose.model("User", userSchema);

export default User;
