import mongoose from 'mongoose';
import ChatRoom from './chatRoom.js';
import User from './User.js';


const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true },
    recieverId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true },
    content: {
        text: String,
        mediaUrl: String
},
    messageType : { type : String, enum : ['text', 'image', 'audio'], default : 'text' },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    deliveredTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},


{timestamps : true});



messageSchema.pre('validate', function validateMessageContent(next) {
    const hasText = typeof this.content.text === 'string' && this.content.text.trim().length > 0;
    const hasImage = typeof this.content.mediaUrl === 'string' && this.content.mediaUrl.trim().length > 0;
    const hasAudio = typeof this.content.audio === 'string' && this.content.audio.trim().length > 0;

    if (this.messageType === 'text' && !hasText) {
        this.invalidate('text', 'Text is required when messageType is text.');
    }

    if (this.messageType === 'image' && !hasImage) {
        this.invalidate('image', 'Image is required when messageType is image.');
    }

    if (this.messageType === 'audio' && !hasAudio) {
        this.invalidate('audio', 'Audio is required when messageType is audio.');
    }

    next();
});

messageSchema.index({ chatId: 1 }); // created index on chatId fro fast retrieval
messageSchema.index({ chatId: 1, createdAt: 1 }); // compound indec on chatId and createdAt for efficient sorting 

const Message = mongoose.model('Message', messageSchema);

export default Message;