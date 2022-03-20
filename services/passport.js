const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModule = require('../models/User');
const crypto = require('crypto');

async function verify(email, password, done) {
    const user = await userModule.findByEmail(email);
    if (!user) {
        done(null, false, {
            email: 'Пользователь не найден'
        });
    } else {
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
        if (user.passwordHash !== hashedPassword) {
            return done(null, false, {
                password: 'Неверный пароль'
            });
        }

        return done(null, user);
    }
}

passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, verify));
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
    const user = await userModule.findById(id);
    if (!user) {
       return cb(null, false, 'Пользователь не найден')
    }
    return cb(null, user)
});

module.exports = passport;
