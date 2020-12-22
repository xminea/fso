const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('', async (request, response) => {
    const body = request.body
    const user = await User.findById(body.user.id)

    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    try {
        const result = await blog.save()
        user.blogs = user.blogs.concat(result.id)
        await user.save()
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
