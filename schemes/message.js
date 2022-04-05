const { Schema, model, ObjectId } = require('mongoose');

const MessageSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    sendAt: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    readAt: {
        type: Date,
    },
});

module.exports = model('Message ', MessageSchema);
