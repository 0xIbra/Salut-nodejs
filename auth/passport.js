const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../entities/user.model')
const UserService = require('../services/user.service')

module.exports = async (passport) => {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = process.env.SECRET
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            let user = await UserService.getUserById(jwt_payload.user._id)
            if (user)
                return done(null, user)
            else 
                return done(null, false)
        } catch (e) {
            done(e, false)
            throw e
        }
    }))
}