import mongoose from 'mongoose';
import Message from './Message.js';
import User from './User.js';


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
    }

}, {timestamps : true});


const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;