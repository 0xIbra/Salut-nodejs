const express = require('express')
const router = express.Router()
const passport = require('passport')
const Event = require('../entities/event.model')
const EventController = require('../controllers/event.controller')
const AccountType = require('../entities/account-type.model')

const {check, checkSchema} = require('express-validator/check')

router.get('/auth/events', passport.authenticate('jwt', {session: false}), EventController.events)

router.post('/auth/events', [
    check('title').exists().isString().withMessage('Le titre doit etre une chaine de caracteres'),
    check('location').exists().withMessage('Le lieu est necessaire pour creer un evenement'),
    check('location.address').exists().withMessage('L\'adresse est necessaire'),
    check('start').exists().withMessage('La date de debut est necessaire'),
    check('end').exists().withMessage('La date de fin est necessaire'),
    check('spots').exists().withMessage('Le nombre de places disponibles est necessaire').isInt().withMessage('Merci de fournir un nombre valide')
], passport.authenticate('jwt', {session: false}), EventController.createEvent)

router.get('/auth/events/:id', passport.authenticate('jwt', {session: false}), EventController.findEvent)

// router.get('/test', async (req, res) => {
//     let accountTypes = [
//         new AccountType({
//             name: 'Student'
//         }),
//         new AccountType({
//             name: 'Intern'
//         }),
//         new AccountType({
//             name: 'Speaker'
//         }),
//         new AccountType({
//             name: 'VIP'
//         })
//     ]

//     await accountTypes.forEach(item => {
//         item.save()
//     })
    
//     res.json({success: true, message: "Done"})
// })

module.exports = router