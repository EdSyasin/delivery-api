const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: false
    }
});

const UserModel = model('user', UserSchema);

module.exports = {
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
    ...UserModel
}
