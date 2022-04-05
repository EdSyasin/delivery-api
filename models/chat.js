const ChatModel = require('../schemes/chat')

const subscriptions = []

const chat = {
    async find(users) {
        const chat = await ChatModel.findOne({users: {$all: users}}).populate('messages');
        return chat || null;
    },

    async getHistory (id) {
        return ChatModel.findById(id).select('-_id messages').populate('messages.author');
    },

    async sendMessage (data) {
        console.log(data)
        const { author, receiver, text } = data;
        const currentDate = new Date().toISOString();

        try {
            const chat = await ChatModel.findOne({ users: { $all: [author, receiver] } });
            if (chat) {
                await ChatModel.findOneAndUpdate(
                    { _id: chat._id },
                    {
                        $push: {
                            messages: { author, text, sentAt: currentDate },
                        },
                    },
                    { returnDocument: 'after' }
                );
            } else {
                await ChatModel.create({
                    users: [author, receiver],
                    text,
                    createdAt: currentDate,
                    messages: [{ author, text, sentAt: currentDate }],
                });
            }
            const message = { author: author, text };
            subscriptions.forEach((cb) => cb(chat._id, message));
        } catch(error) {
            console.log(error);
            return null;
        }
    },

    subscribe(callback) {
        subscriptions.push(callback)
    }
}

module.exports = chat
