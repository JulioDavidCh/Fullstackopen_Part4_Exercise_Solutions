// The mongoose library is only imported to close our connection to the database
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

test('blogs unique identifier is id', async() => {
  const blogs = await api.get('/api/blogs')
  for(let blog of blogs.body){
    expect(blog.id).toBeDefined()
  }
})

afterAll(() => {
  mongoose.connection.close()
})

const countNumbers = (numberArray) => {
  let numbersFound = 0;
  for(let value of numberArray){
    if(typeof value === 'number') continue
    if(value.trim('') === '') continue
    if(Number.isNaN(Number(value))) continue
    numbersFound++
  }
  console.log(numbersFound)
  return numbersFound
}