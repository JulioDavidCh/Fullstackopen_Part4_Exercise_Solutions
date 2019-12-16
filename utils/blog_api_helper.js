const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "test",
    author: "test",
    url: "test",
    likes: 0
  },
  {
    title: "test1",
    author: "test1",
    url: "test1",
    likes: 0
  },
  {
    title: "test2",
    author: "test2",
    url: "test2",
    likes: 0
  },
]

const blogsInDB = async () =>{
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDB
}