const mongoose = require('mongoose')

const AccountTypeSchema = mongoose.Schema({
    name: { type: String, required: true }
})

AccountTypeSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.__v
        return ret
    }
})

const AccountType = module.exports = mongoose.model('AccountType', AccountTypeSchema)