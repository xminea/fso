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
