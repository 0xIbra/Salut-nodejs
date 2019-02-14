const mongoose = require('mongoose')
const User = require('./user.model').schema
const Program = require('./program.model').schema
const Activity = require('./activity.model').schema
const AccountType = require('./account-type.model').schema

const ParticipantSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    accountType: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountType' },
    created_at: { type: Date, default: Date.now }
})

const Participant = module.exports = mongoose.model('Participant', ParticipantSchema)