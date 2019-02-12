const mongoose = require('mongoose')
const Event = require('./event.model').schema
const Group = require('./group.model').schema
const Participant = require('./participant.model').schema

const ProgramSchema = mongoose.Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
    accountTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AccountType' }],
    created_at: { type: Date, default: Date.now }
})

const Program = module.exports = mongoose.model('Program', ProgramSchema)