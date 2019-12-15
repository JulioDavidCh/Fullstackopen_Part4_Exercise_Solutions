// The mongoose library is only imported to close our connection to the database
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/blog_api_helper')
const Blog = require('../models/blog')

// We use supertest to wrap our express app
const api = supertest(app)

beforeEach(async () =>{
  await Blog.deleteMany({})

  for(let blog of helper.blogsInDB){
    let newBlog = new Blog(blog)
    await newBlog.save()
  }
})

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

test('a blog is sucessfully added to the database', async () =>{
  const initialBlogs = await helper.initialBlogs()

  const newBlogToAdd = {
    title: "test3",
    author: "test3",
    url: "test3"
  }

  await api
    .post('/api/blogs')
    .send(newBlogToAdd)
    .expect(201)
    .expect('content-type', /application\/json/)
  
  const afterBlogs = await helper.initialBlogs()

  expect(afterBlogs.length).toBe(initialBlogs.length + 1)
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