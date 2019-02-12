const mongoose = require('mongoose')
const Location = require('./location.model').schema
const ActivityType = require('./activity-type.model').schema
const Group = require('./group.model').schema
const Participant = require('./participant.model').schema

const ActivitySchema = mongoose.Schema({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'ActivityType' },
    title: { type: String, required: true },
    description: { type: String, required: false },
    spots: { type: Number, required: true },
    duration: { type: Number, required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    vegetarian: { type: Boolean, default: false },
    gluten: { type: Boolean, default: false },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }]
})

const Activity = module.exports = mongoose.model('Activity', ActivitySchema)