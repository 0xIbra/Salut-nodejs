const User = require('../entities/user.model')
const UserService = require('../services/user.service')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const ExtractJwt = require('passport-jwt')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const { validationResult } = require('express-validator/check')

const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

module.exports.register = async (req, res) => {
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
            let token = await UserService.createUser(user)
            try {
                let source = fs.readFileSync(path.resolve('templates/confirmation.hbs'), 'utf8')
                let template = await handlebars.compile(source)

                const mail = {
                    to: user.email,
                    from: 'noreply@salut.tk',
                    subject: 'Confirmation Salut',
                    text: `Confirmez votre email en visitant ce lien ${process.env.DOMAIN}/api/confirm/${token}`,
                    html: template({ name: user.first_name, confirmUrl: `${process.env.DOMAIN}/api/confirm/${token}` })
                }
    
                sendgrid.send(mail)
    
                return res.status(201).json({ success: true, message: 'Votre compte a bien été creé, merci de l\'activer a partir de votre boite mail.'});
            } catch(e) {
                throw e
            }
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
        return res.status(404).json({success: false, message: 'Êtes-vous sûr que vous avez activé votre compte ?'})

    try {
        let isMatch = await UserService.comparePassword(password, user.password)
        if (isMatch) {
            const token = await jwt.sign({user: user}, process.env.SECRET,{
                expiresIn: 3600 * 48
            })
            res.json({
                success: true,
                token: `JWT ${token}`,
                user: user
            })
        } else {
            res.status(400).json({ success: false, message: 'Identifiants invalides' })
        }
    } catch (e) {
        throw e
    }
}


module.exports.confirm = async (req, res) => {
    jwt.verify(req.params.token, process.env.SECRET, async (err, decoded) => {
        if (err)
            res.status(400).json({ success: false, message: 'Mauvais JWT' })
        
        try {
            let user = await UserService.getUserById(decoded.id)
            if (!user){
                res.status(404).json({ success: false, message: 'Utilisateur n\'a pas été trouvé' })
            }            

            if (user.enabled){
                res.status(400).json({ success: false, message: 'Votre compte est déjà actif' })
            } else {
                user.enabled = true
                let update = await UserService.updateUser(user)
                res.status(202).json({ success: true, user: update, message: 'Votre compte a bien été activé' })
            }
        } catch (e) {
            throw e
        }
    })
}


module.exports.profile = (req, res) => {
    res.json({
        success: true,
        user: req.user
    })
}