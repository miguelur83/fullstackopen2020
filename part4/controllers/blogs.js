const blogsRouter = require('express').Router()
const { exists } = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    //const blog = new Blog(request.body)

    try {
        const res = await blog.delete(id)
        response.status(201).json(res)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        const savedBlog = await blog.update()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter