const User = require('../entities/user.model')
const UserService = require('../services/user.service')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const ExtractJwt = require('passport-jwt')

const { validationResult } = require('express-validator/check')

module.exports.register = async (req, res, next) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }


}