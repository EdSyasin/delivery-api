const config = require('./config');
const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use('/api', require('./routers/user'));

(async () => {
    try {
        await mongoose.connect(`mongodb://${config.mongoHost}:${config.mongoPort}`, {
            user: config.mongoUser,
            pass: config.mongoPassword,
            dbName: config.mongoDb,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        server.listen(config.port);
        console.log(`Listening on port ${config.port}`);
    } catch (error) {
        console.log('error connect', error);
    }
})()
