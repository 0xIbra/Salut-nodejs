require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const mongoose = require('mongoose')
const bluebird = require('bluebird')

mongoose.Promise = bluebird

mongoose.connect(process.env.DB)
    .then(() => {
        console.log('Succesfully connected to MongoDB')
    })
    .catch(() => {
        console.log('Error connecting to MongoDB')
    })

const app = express()
const port = 3000 || process.env.PORT

app.use(cors())
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res, next) => {
    res.json({ status: true, message: 'Hello World !' })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})