const mongoose = require('mongoose')
const Program = require('./program.model').schema
const Activity = require('./activity.model').schema

const GroupSchema = mongoose.Schema({
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    title: { type: String, required: true },
    start: { type: Date, default: Date.now },
    end: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
})

const Group = module.exports = mongoose.model('Group', GroupSchema)