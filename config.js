require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongoHost: process.env.MONGO_HOST || 'localhost',
    mongoPort: process.env.MONGO_PORT || 27017,
    mongoDb: process.env.MONGO_DB || "library",
    mongoUser: process.env.MONGO_USER || "libuser",
    mongoPassword: process.env.MONGO_PASSWORD || "xb46yt",
    secret: process.env.SECRET || 'foobar'
}
