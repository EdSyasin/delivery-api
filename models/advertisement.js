const AdvertisementModel = require('../schemes/advertisement')

const advertisement = {
    async create(data) {
        const newAdvertisement = new AdvertisementModel(data);
        await newAdvertisement.save();
        return newAdvertisement;
    },

    async list(){
        const advertisements = await AdvertisementModel.find().populate('user', ['id', 'name']);
        return advertisements;
    },

    /**
     *
     * @param id {string}
     * @returns {Promise<Query<any, any, {}, any>|null>}
     */
    async findById(id) {
        const advertisement = await AdvertisementModel.findById(id);
        return advertisement || null;
    },

    /**
     *
     * @param id {string}
     * @returns {Promise<boolean>}
     */
    async remove(id) {
        const advertisement = await AdvertisementModel.findById(id);
        if (!advertisement) {
            return false;
        } else {
            advertisement.isDeleted = true;
            return true;
        }
    }
}

module.exports = advertisement
