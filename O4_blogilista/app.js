require('dotenv').config()
const express = require('express')

const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middlewares = require('./utils/middlewares')

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
app.use(middlewares.tokenExtractor)
app.use('/api/blogs/', blogRouter)
app.use('/api/users/', usersRouter)
app.use('/api/login', loginRouter)
app.use(middlewares.errorHandler)

module.exports = app
