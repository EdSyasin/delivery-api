const router = require('express').Router();
const userModule = require('../models/user');
const advertisement = require('../models/advertisement');
const crypto = require('crypto');
const passport = require('../services/passport');
const fileMiddleware = require('../middleware/fileMiddleware');

router.get('/advertisements', async (req, res) => {
    return res.json({
        status: 'ok',
        data: await advertisement.list(),
    })
});

router.post('/advertisements', fileMiddleware.fields([{name: 'images', maxCount: 5}]), async (request, response) => {
    if (request.isAuthenticated()) {
        const { shortTitle, description } = request.body;
        const images = request?.files?.images;

        if (!shortTitle || !description) {
            return response.status(422).json({
                status: 'error',
                error: 'Поля shortTitle и description обязательны',
            })
        }

        const newAdvertisement = await advertisement.create({
            shortTitle,
            description,
            userId: request.user.id,
            createdAt: (new Date),
            updatedAt: (new Date),
            isDeleted: false,
            images: images.map(e => e.path)
        });

        return response.status(201).json({
            status: 'ok',
            data: newAdvertisement
        })
    } else {
        return response.status(401).json({
            status: 'error',
            error: 'Неавторизован'
        })
    }
})

module.exports = router;
