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

  const blogs = helper.initialBlogs

  for(let blog of blogs){
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
  const initialBlogs = helper.initialBlogs

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
  
  const afterBlogs = await helper.blogsInDB()

  expect(afterBlogs.length).toBe(initialBlogs.length + 1)
})

test('if the likes property of a post request is missing, it will default 0', async () =>{
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

  const afterBlogs = await helper.blogsInDB()

  expect(afterBlogs[3].likes).toBe(0)
})

test('if the request title or url are missing, the response status code is 400', async () =>{
  const newBlogToAdd = {
    author: "test3"
  }

  await api
  .post('/api/blogs')
  .send(newBlogToAdd)
  .expect(400)
})

test('a blog is sucessfully deleted from the database', async () => {
  const initialBlogs = helper.initialBlogs
  const blogsInDB = await helper.blogsInDB()
  const blogToDelete = blogsInDB[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const afterDeleteBlogs = await helper.blogsInDB()

  expect(afterDeleteBlogs.length).toBe(initialBlogs.length - 1)

  expect(afterDeleteBlogs).not.toContain(blogToDelete.url)
})

test('a blog that exist gets its likes updated successfully', async () => {
  const blogsInDB = await helper.blogsInDB()
  const blogToUpdate = blogsInDB[0]

  blogToUpdate.likes = blogToUpdate.likes + 1

  const updatedBlog = 
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('content-type', /application\/json/)

  expect(updatedBlog.body.likes).toBe(blogToUpdate.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
