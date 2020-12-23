const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

usersRouter.get('', async (request, response) => {
    const users = await User
        .find({}).populate('notes', { content: 1, date: 1 })
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('', async (request, response) => {
    const body = request.body
    const password = body.password

    if (password === undefined) {
        const error = new Error('Password missing')
        error.name = 'ValidationError'
        throw error
    }
    if (password.length < 3) {
        const error = new Error('Password length must be 3 characters or longer')
        error.name = 'ValidationError'
        throw error
    }

    

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        password: passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter