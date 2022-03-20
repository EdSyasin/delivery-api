const router = require('express').Router();
const userModule = require('../models/user');
const crypto = require('crypto');
const passport = require('../services/passport');

router.get('/user', (request, response) => {
    if (request.isAuthenticated()) {
        return response.json({
            status: 'ok',
            data: request.user
        })
    } else {
        return response.status(401).json({
            status: 'error',
            error: 'Неавторизован'
        })
    }
})

router.post('/signup', async (request, response) => {
    const { email, password, name, contactPhone } = request.body;
    if (!email || !password || !name ) {
        return response.status(422).json({
            status: 'error',
            error: 'Поля email, password и name обязательны'
        })
    } else if( await userModule.findByEmail(email)) {
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
});

router.post('/signin', async (request, response) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return response.status(404).json({
                status: 'error',
                error: err
            })
        }
        if (user) {
            request.login(user, () => {
                return response.json({
                    status: 'ok',
                    data: user
                });
            })
        } else {
            return response.status(401).json({
                status: "error",
                error: info
            })
        }
    })(request, response)
})


module.exports = router;
