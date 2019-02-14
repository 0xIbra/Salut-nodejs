const User = require('../entities/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.getUserById = async (id) => {
    return await User.findById(id)
}

module.exports.checkIfExists = (user) => {
    try {
        return User.find(user)
    } catch (e) {
        throw e
    }
}

module.exports.getUserByEmail = async (email) => {
    try {
        const query = { email: email, enabled: true }
        return await User.findOne(query)
    } catch (e) {
        throw e
    }
}

module.exports.createUser = async (user) => {
    const hash = await hashPassword(user)
    user.password = hash
    try {
        let createdUser = await user.save()
        let token = jwt.sign({id: createdUser._id}, process.env.SECRET, {
            expiresIn: 3600 * 48
        })
        return token
    } catch (e) {
        throw e
    }
}

module.exports.updateUser = async (user) => {
    try {
        return await user.save()
    } catch (e) {
        throw e
    }
}


const hashPassword = async (user) => {
    const pass = user.password
    const saltR = 10

    const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(pass, saltR, (err, hashed) => {
            if (err) reject(err)
            resolve(hashed)
        })
    })

    return hash
}


module.exports.comparePassword = async (password, hash) => {
    try {
        let isMatch = await bcrypt.compare(password, hash)
        return isMatch
    } catch (e) {
        throw e
    }
}