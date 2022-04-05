const chatController = require('./models/chat')

module.exports = (io) => (req, res, next) => {
    io.on('connection', (socket) => {
        console.log('Socket connection!');
        const { id } = socket;

        const subCallback = async (chatId, message) => {
            console.log('subscriber emit', message);
            io.sockets.emit('newMessage', { chatId, message});
        };

        chatController.subscribe(subCallback);

        socket.on('getHistory', async (data) => {
            if (req.user) {
                const currentUserId = req.user._id;
                const { receiverId } = data;
                const chat = await chatController.find([currentUserId, receiverId]);
                const history = await chatController.getHistory(chat._id);
                io.sockets.emit('chatHistory', { history });
            }
        });

        socket.on('sendMessage', async (data) => {
            if (req.user) {
                const author = req.user._id;
                const { receiver, text } = data;
                await chatController.sendMessage({
                    author,
                    receiver,
                    text
                });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
    next();
};
