const lodash = require('lodash')

const dummy = (blogs) => {
    blogs + 1
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => blog.likes)
    return likes.reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
    var favorite
    var likes = 0
    for (var blog of blogs) {
        if (blog.likes > likes) {
            favorite = blog
            likes = blog.likes
        }
    }
    if (!favorite) {
        return
    }
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return

    const groupByAuthor = lodash.groupBy(blogs, 'author')
    const authors = Object.keys(groupByAuthor)
    const map = authors.map((author) => {
        return {
            author: author,
            blogs: groupByAuthor[author].length,
        }
    })
    const sort = lodash.sortBy(map, lodash.property(['blogs']))
    return sort[sort.length - 1]
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return

    const groupByAuthor = lodash.groupBy(blogs, 'author')
    const authors = Object.keys(groupByAuthor)
    const map = authors.map((author) => {
        const likes = groupByAuthor[author].map((blog) => blog.likes).reduce((a, b) => a + b, 0)
        return {
            author,
            likes,
        }
    })

    const sorted = lodash.sortBy(map, lodash.property(['likes']))
    return sorted[sorted.length - 1]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
