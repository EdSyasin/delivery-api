const AdvertisementModel = require('../schemes/advertisement')

const advertisement = {
    async create(data) {
        const newAdvertisement = new AdvertisementModel(data);
        await newAdvertisement.save();
        return newAdvertisement;
    },

    async list(){
        return AdvertisementModel
            .find({isDeleted: false})
            .populate('user', ['id', 'name']);
    },

    /**
     *
     * @param id {string}
     * @returns {Promise<Query<any, any, {}, any>|null>}
     */
    async findById(id) {
        const advertisement = await AdvertisementModel.findOne({_id: id, isDeleted: false}).populate('user', ['id', 'name']);
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
            await advertisement.save()
            return true;
        }
    }
}

module.exports = advertisement
