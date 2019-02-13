const User = require('../entities/user.model')
const UserService = require('../services/user.service')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const ExtractJwt = require('passport-jwt')

const { validationResult } = require('express-validator/check')

module.exports.register = async (req, res, next) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    let user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: 'USER'
    })

    try {
        let exists = await UserService.checkIfExists({ email: user.email })
        if (exists.length > 0) {
            res.status(409).json({
                success: false,
                message: 'L\'adresse email existe deja'
            })
        } else {
            let creation = await UserService.createUser(user)
            return res.status(201).json({ success: true, message: 'Votre compte a bien été creé, merci de l\'activer a partir de votre boite mail.'});
        }
    } catch (e) {
        throw e
    }
}


module.exports.login = async (req, res, next) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    const email = req.body.email
    const password = req.body.password

    let user = await UserService.getUserByEmail(email)
    if (!user)
        return res.status(404).json({success: false, message: 'Utilisateur non trouvé'})
}