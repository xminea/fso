const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
]

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(helper.initialBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('of empty list is undefined', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(undefined)
    })

    test('finds favorite', () => {
        const result = listHelper.favoriteBlog(helper.initialBlogs)
        expect(result).toEqual({
            author: helper.initialBlogs[2].author,
            likes: helper.initialBlogs[2].likes,
            title: helper.initialBlogs[2].title,
        })
    })
})

describe('most blogs', () => {
    test('of empty list is undefined', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(undefined)
    })
    test('finds correct author and blogs', () => {
        const result = listHelper.mostBlogs(helper.initialBlogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3,
        })
    })
})

describe('most likes', () => {
    test('of empty list is undefined', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual(undefined)
    })
    test('finds correct author and likes', () => {
        const result = listHelper.mostLikes(helper.initialBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        })
    })
})
