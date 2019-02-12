const User = require('../entities/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback)
}