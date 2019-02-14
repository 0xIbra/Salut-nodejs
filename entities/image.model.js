const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    name: { type: String, required: false },
    url: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
})

const Image = module.exports = mongoose.model('Image', ImageSchema)