module.exports = (io) => (req, res, next) => {
    io.on('connection', (socket) => {
        console.log('Socket connection!');

        // const notify = async (chatId, message) => {
        //     io.sockets.emit('newMessage', { message, chatId });
        // };
        //
        // chatController.subscribe(notify);
        //
        // socket.on('getHistory', async (data) => {
        //     if (req.user) {
        //         const currentUserId = req.user._id;
        //         const { receiverId } = data;
        //         const chat = await chatController.find([currentUserId, receiverId]);
        //         const history = await chatController.getHistory(chat._id);
        //         io.sockets.emit('chatHistory', { history });
        //     }
        // });
        //
        socket.on('sendMessage', async (data) => {
            if (req.user) {
                const author = req.user._id;
                const { receiver, text } = data;
                console.log(author)
                console.log('to', receiver)
                console.log('what', text)
                // await chatController.sendMessage({
                //     author,
                //     receiver,
                //     text
                // });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
    next();
};
