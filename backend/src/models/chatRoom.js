import mongoose from 'mongoose';


const chatRoomSchema = new mongoose.Schema({
  
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message'
    }]  ,

    isGroupChat : {
        type : Boolean,
        default : false
    },
    groupName : {
        type : String,
        required : function() { return this.isGroupChat; }
    },
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : function() { return this.isGroupChat; }
    },
    lastMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message'
    },
    groupCode : {
        type : String,
        unique : true,
        index : true
    },
    groupPic : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }

}, {timestamps : true});


const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;