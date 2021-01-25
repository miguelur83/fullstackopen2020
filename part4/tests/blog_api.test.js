const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id property exists', async () => {
  var response = await api.get('/api/blogs')
  oneBlog = response.body[0]
  expect(oneBlog.id).toBeDefined()
})

test('post request creates a new blog', async () => {
  var allBlogs = await api.get('/api/blogs')
  initialTotal = allBlogs.body.length

  var newblog = {
    title: "Bogus Blog Post for Testing",
    author: "Auther A. Pearson",
    url: "http://www.thisurlwontwork.com/blog",
    likes: 33
  }

  var response = await api
    .post('/api/blogs')
    .send(newblog)
    .expect(201)
    
  allBlogs = await api.get('/api/blogs')
  expect(allBlogs.body.length).toBe(initialTotal + 1)
  
  /*expect(notesAtEnd.length).toBe(helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
  */
})

afterAll(() => {
  mongoose.connection.close()
})