const express = require('express')
const router = express.Router()
const passport = require('passport')
const Event = require('../entities/event.model')
const EventController = require('../controllers/event.controller')
const AccountType = require('../entities/account-type.model')

const {check} = require('express-validator/check')

router.get('/auth/events', passport.authenticate('jwt', {session: false}), EventController.events)

router.post('/auth/events', passport.authenticate('jwt', {session: false}), EventController.createEvent)

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