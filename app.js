// let env = process.env.NODE_ENV
// if(env !== 'production') {
//   require('dotenv').config()
// }
require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })

const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandling = require('./middlewares/error-handling')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)

app.use(errorHandling)

 module.exports = app