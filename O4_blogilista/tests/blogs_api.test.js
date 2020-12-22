const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')



beforeEach(async () => {
    await Blog.deleteMany({})
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
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  
})

test('note without url is not added', async () => {
    const newNote = {
        title: 'testi',
        author: 'joku',
        likes: 69
    }
  
    await api
        .post('/api/blogs')
        .send(newNote)
        .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('note without title is not added', async () => {
    const newNote = {
        author: 'joku',
        url: 'settei',
        likes: 69
    }
  
    await api
        .post('/api/blogs')
        .send(newNote)
        .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blogs can be deleted', async () => {
   
    await api
        .delete('/api/blogs/5a422a851b54a676234d17f7')
        .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('blogs can be edited', async () => {
    const editedBlog = {
        title: 'new things',
        author: 'pekka pouta',
        url: 'pekkanet.fi',
        likes: 69
    }
    await api
        .put('/api/blogs/5a422a851b54a676234d17f7')
        .send(editedBlog)
        .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd[0].likes).toBe(69)
})

afterAll(() => {
    mongoose.connection.close()
})