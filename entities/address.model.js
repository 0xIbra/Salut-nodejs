const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema({
    line1: { type: String, required: true },
    line2: { type: String, required: false },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
})

const Address = module.exports = mongoose.model('Address', AddressSchema)