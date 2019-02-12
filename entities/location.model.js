const mongoose = require('mongoose')
const Address = require('./address.model').schema

const LocationSchema = mongoose.Schema({
    title: { type: String, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    created_at: { type: Date, default: Date.now }
})

const Address = module.exports = mongoose.model('Location', LocationSchema)