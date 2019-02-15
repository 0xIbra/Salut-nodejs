const Event = require('../entities/event.model')
const EventService = require('../services/event.service')
const Location = require('../entities/location.model')
const Address = require('../entities/address.model')
const Program = require('../entities/program.model')
const UserService = require('../services/user.service')
const EventVoter = require('../security/voters/event.voter')

const {validationResult} = require('express-validator/check')

module.exports.events = async (req, res) => {
    res.json(req.user.events)
}


module.exports.createEvent = async (req, res) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({success: false, errors: errors})
    }

    
    let event = new Event({
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        spots: req.body.spots,
        organizer: req.user
    })

    if (req.body.location !== undefined) {
        let location = new Location({
            address: new Address({
                line1: req.body.location.address.line1,
                line2: req.body.location.address.line2,
                city: req.body.location.address.city,
                zip: req.body.location.address.zip,
            }),
            title: req.body.location.title
        })

        event.location = location
    }

    if (req.body.programs !== undefined) {
        req.body.programs.forEach(program => {
            event.programs.push(new Program({
                title: program.title,
                start: program.start,
                end: program.end,
                accountTypes: program.accountTypes
            }))
        });
    }

    try {
        let creation = await EventService.createEvent(event)
        await req.user.events.push(event)
        let updatedUser = await UserService.updateUser(req.user)
        if (!creation || !updatedUser) {
            return res.status(400).json({success: false, message: 'Une erreur est survenue lors de la creation'})
        }

        res.status(201).json({success: true, message: 'Creation reussite'})
    } catch (e) {
        throw e
    }
}


module.exports.findEvent = async (req, res) => {
    let event = await EventService.findById(req.params.id)
    if (!event)
        return res.status(404).json({success: false, message: 'L\'evenement avec ce ID n\'a pas été trouvé'})

    let permission = await EventVoter.canView(event, req.user)
    if (!permission)
        return res.status(400).json({success: false, message: 'Vous n\'avez pas les permission necessaires'})

    res.status(200).json(event)
}