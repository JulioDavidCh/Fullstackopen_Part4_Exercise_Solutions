// The mongoose library is only imported to closse our connection to the database
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// We use supertest to wrap our express app
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})