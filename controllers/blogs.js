const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// blogRouter.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })
  
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  res.json(blogs.map(entry => entry.toJSON()))
})

blogRouter.post('/', async (req, res, next) => {
  try{
    const body = req.body

    const userInDb = await User.findById(body.userId)
  
    const newBlogToAdd = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: userInDb._id
    }

    const blogToAdd = new Blog(newBlogToAdd)
    const addedBlog = await blogToAdd.save(newBlogToAdd)

    userInDb.blogs = userInDb.blogs.concat(addedBlog.id)

    await userInDb.save()

    res.status(201).json(addedBlog)

  }catch(exception){
    next(exception)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try{
    const id =  req.params.id
  
    await Blog.findByIdAndDelete(id)

    res.status(204).end()

  }catch(error){
    next(error)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try{
    const id =  req.params.id
    console.log(id)
  
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  }catch(error){
    next(error)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  try{
    const id = req.params.id
    const body = req.body

    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true })

    res.json(updatedBlog.toJSON()).end
  }catch(error){
    next(error)
  }
})

module.exports = blogRouter
