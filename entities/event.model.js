const mongoose = require('mongoose')
const Location = require('./location.model').schema
const Program = require('./program.model').schema

const EventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    spots: { type: Number, required: true },
    programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
    published: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
})

const Event = module.exports = mongoose.model('Event', EventSchema)