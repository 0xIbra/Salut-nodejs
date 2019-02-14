const Event = require('../entities/event.model')
const EventService = require('../services/event.service')
const Location = require('../entities/location.model')
const Address = require('../entities/address.model')
const Program = require('../entities/program.model')

const {validationResult} = require('express-validator/check')

module.exports.events = async (req, res) => {
    res.json(req.user.events)
}

module.exports.createEvent = async (req, res) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({success: false, errors: errors})
    }

    let event = new Event({
        title: req.body.title,
        description: req.body.description,
        location: new Location({
            address: new Address({
                line1: req.body.location.address.line1,
                line2: req.body.location.address.line2,
                city: req.body.location.address.city,
                zip: req.body.location.address.zip,
            }),
            title: req.body.location.title
        }),
        start: req.body.start,
        end: req.body.end,
        spots: req.body.spots,
        organizer: req.user
    })

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
        if (!creation) {
            return res.status(400).json({success: false, message: 'Une erreur est survenue lors de la creation'})
        }

        res.status(201).json({success: true, message: 'Creation reussite'})
    } catch (e) {
        throw e
    }
}