const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}
  
blogRouter.get('', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs.map(note => note.toJSON()))
})

blogRouter.post('', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    try {
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        response.status(201).json(result.toJSON())
    } catch(exception) {
        response.status(400).send('Title or url missing')
    }
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogRouter.delete('/:id', async (request, response) => {
    try {
        const blog = await Blog.findByIdAndRemove(request.params.id)
        response.status(200).json(blog)
    } catch(exception) {
        response.status(400).send('No such blog')
    }
})

blogRouter.put('/:id', async (request, response) => {
    const likes = request.body.likes
    const title = request.body.title
    const author = request.body.author
    const url = request.body.url
    try {
        await Blog.findOneAndUpdate({'_id': request.params.id}, {likes, title, author, url}, {runValidators: true})

        response.send({
            likes,
            title,
            author,
            url
        })
    } catch(exception) {
        response.status(400).send('No such blog')
    }

})

module.exports = blogRouter
