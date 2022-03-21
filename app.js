const config = require('./config');
const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('./services/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(passport.initialize(undefined));
app.use(passport.session(undefined))

app.use('/api', require('./routers/user'));
app.use('/api', require('./routers/advertisement'));

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
