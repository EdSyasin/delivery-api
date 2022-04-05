const { Schema, model } = require('mongoose');
const MessageSchema = require('./message')

const ChatSchema = new Schema({
    users: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref : 'User',
                required: true
            }
        ],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    messages: [MessageSchema]
});

module.exports = model('Chat ', ChatSchema);
