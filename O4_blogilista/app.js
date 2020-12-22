require('dotenv').config()
const express = require('express')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const { errorHandler } = require('./utils/errorHandler')

let mongoUrl = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test') {
    mongoUrl = process.env.TEST_MONGODB_URI
}

logger.info('connecting to', mongoUrl)

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs/', blogRouter)
app.use('/api/users/', usersRouter)
app.use(errorHandler)

module.exports = app
