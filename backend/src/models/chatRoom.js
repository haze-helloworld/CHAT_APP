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
    }

}, {timestamps : true});


const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;