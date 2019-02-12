const mongoose = require('mongoose')

const ActivityTypeSchema = mongoose.Schema({
    name: { type: String, required: true }
})

const ActivityType = module.exports = mongoose.model('ActivityType', ActivityTypeSchema)