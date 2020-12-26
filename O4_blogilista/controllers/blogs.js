const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')
const jwt = require('jsonwebtoken')

  
blogRouter.get('', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('', async (request, response) => {
    const { body } = request
    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!decodedToken || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    
    try {
        const user = await User.findById(decodedToken.id)
    
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

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
    const { id } = request.params
  
    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(id)
  
    const user = await User.findById(decodedToken.id)
  
    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } else {
        response
            .status(401)
            .json({ error: 'Wrong user' })
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
