const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "test",
    author: "test",
    url: "test"
  },
  {
    title: "test1",
    author: "test1",
    url: "test1"
  },
  {
    title: "test2",
    author: "test2",
    url: "test2"
  },
]

const blogsInDB = async () =>{
  const blogs = await Blog.find({})
  console.log(blogs)
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDB
}