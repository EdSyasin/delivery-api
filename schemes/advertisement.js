const { Schema, model, ObjectId } = require('mongoose');

const AdvertisementSchema = new Schema({
    shortTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    images: {
        type: [
            {
                type: String,
                required: false
            }
        ]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    tags: {
        type: [
            {
                type: String,
                required: false
            }
        ]
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
});

AdvertisementSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
})

// AdvertisementSchema.set('toObject', { virtuals: true })
AdvertisementSchema.set('toJSON', { virtuals: true })

module.exports = model('Advertisement ', AdvertisementSchema);
