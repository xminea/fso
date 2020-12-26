const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')


let token = null

beforeEach(async () => {
    await Blog.deleteMany({})    
    await User.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[4])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[5])
    await blogObject.save()
    const password = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'root', password })
    await user.save()

    await api
        .post('/api/login')
        .send({ username: 'root', password: 'salasana' })
        .then((res) => {
            return (token = res.body.token)
        })

    return token
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('amount of blogs is correct', async () => {
    const response = await api.get('/api/blogs')  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'new things',
        author: 'pekka pouta',
        url: 'pekkanet.fi',
        likes: 69
    }
  
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
})

test('returns blogs with id field', async () => {
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].id).toBeDefined()
    expect(blogsAtEnd[1].id).toBeDefined()
    expect(blogsAtEnd[0]._id).toBeUndefined()
    expect(blogsAtEnd[1]._id).toBeUndefined()

})


test('blog without likes can be added and likes are 0', async () => {
    const newBlog = {
        title: 'uudet tuulet',
        author: 'pekka pouta',
        url: 'pekkanet.fi'
    }
  
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  
})

test('blog without url is not added', async () => {
    const newBlog = {
        title: 'testi',
        author: 'joku',
        likes: 69
    }
  
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without title is not added', async () => {
    const newBlog = {
        author: 'joku',
        url: 'settei',
        likes: 69
    }
  
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

describe('deleting a blog', () => {
    let token = null
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const password = await bcrypt.hash('salasana', 10)
        const user = new User({ username: 'Pekka', password })
        await user.save()

        await api
            .post('/api/login')
            .send({ username: 'Pekka', password: 'salasana' })
            .then((res) => {
                return (token = res.body.token)
            })

        const newBlog = {
            title: 'Päivän sää',
            author: 'Pekka Pouta',
            url: 'huut.is',
        }
        
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        return token
    })

    test('succeeds when token & id are valid', async () => {
        const blogsAtStart = await Blog.find({}).populate('user')
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await Blog.find({}).populate('user')
        expect(blogsAtStart).toHaveLength(1)
        expect(blogsAtEnd).toHaveLength(0)
        expect(blogsAtEnd).toEqual([])
    })

    test('fails without token', async () => {
        const blogsAtStart = await Blog.find({}).populate('user')
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)

        const blogsAtEnd = await Blog.find({}).populate('user')
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
        expect(blogsAtStart).toEqual(blogsAtEnd)
    })
})

afterAll(() => {
    mongoose.connection.close()
})