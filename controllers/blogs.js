const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

  
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  res.json(blogs.map(entry => entry.toJSON()))
})

blogRouter.post('/', async (req, res, next) => {
  const body = req.body

  const token = req.token

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.id){
      return res.status(401).json({error: 'token missing or invalid'})
    }

    let userInDb = await User.findById(decodedToken.id)
  
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

    res.status(201).json(addedBlog.toJSON())

  }catch(exception){
    next(exception)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try{
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const blogId =  req.params.id

    const blogToDelete = await Blog.findById(blogId)
    const blogToDeleteUser = blogToDelete.user

    if(!(token && decodedToken)){
      return res.status(401).json({error: 'token missing or invalid'})
    }else if(blogToDeleteUser.toString() !== decodedToken.id.toString()){
      console.log()
      return res.status(401).json({error: 'unauthorized user'})
    }
  
    await Blog.findByIdAndDelete(blogId)

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
