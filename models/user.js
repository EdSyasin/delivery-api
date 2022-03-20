const UserModel = require('../schemes/user')

const user = {
    async create(data) {
        const newUser = new UserModel(data);
        await newUser.save();
        return newUser;
    },

    /**
     *
     * @param email {string}
     * @returns {Promise<null|any>}
     */
    async findByEmail(email) {
        const user = await UserModel.find({email: email}).exec();
        if(user.length){
            return user[0];
        } else {
            return null
        }
    },

    async findById(id) {
        const user = await UserModel.findById(id);
        return user || null;
    }
}

module.exports = user
