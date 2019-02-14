const mongoose = require('mongoose')
const AccountType = require('./account-type.model').schema
const Participant = require('./participant.model').schema
const Event = require('./event.model').schema

const UserSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    enabled: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountType' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    participations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }]
})

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password
        delete ret.__v
        return ret
    }
})

const User = module.exports = mongoose.model('User', UserSchema)