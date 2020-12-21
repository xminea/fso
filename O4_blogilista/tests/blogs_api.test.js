const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')



beforeEach(async () => {
    await Blog.deleteMany({})
    let noteObject = new Blog(helper.initialBlogs[0])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[1])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[2])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[3])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[4])
    await noteObject.save()
    noteObject = new Blog(helper.initialBlogs[5])
    await noteObject.save()
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
        likes: '69',
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
})

test('returns blogs with id field', async () => {
    const b = await helper.blogsInDb()


    expect(b[0].id).toBeDefined()
    expect(b[1].id).toBeDefined()
    expect(b[0]._id).toBeUndefined()
    expect(b[1]._id).toBeUndefined()

})

/*
test('note without content is not added', async () => {
    const newNote = {
        author: 'joku'
    }
  
    await api
        .post('/api/blogs')
        .send(newNote)
        .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
*/

afterAll(() => {
    mongoose.connection.close()
})