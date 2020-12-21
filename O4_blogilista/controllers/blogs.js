const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('', async (request, response) => {
    
    const blog = new Blog(request.body)
    
    try {
        const result = await blog.save()
        response.status(201).json(result.toJSON())
    } catch(exception) {
        response.status(400).send('Title or url missing')
    }
})

module.exports = blogRouter
