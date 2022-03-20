const router = require('express').Router();
const userModule = require('../models/user');
const crypto = require('crypto');

router.post('/signup', async (request, response) => {
    const { email, password, name, contactPhone } = request.body;
    if (!email || !password || !name ) {
        return response.status(422).json({
            status: 'error',
            error: 'Поля email, password и name обязательны'
        })
    } else if(await userModule.findByEmail(email)) {
        response.status(409).json({
            status: 'error',
            error: 'email занят'
        })
    } else {
        const passwordHash = crypto.createHash('md5').update(password).digest('hex')
        const user = await userModule.create({email, passwordHash, name, contactPhone});
        response.status(201).json({
            status: 'ok',
            data: user
        });
    }
})

module.exports = router;
