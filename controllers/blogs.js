const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// blogRouter.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })
  
blogRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs.map(entry => entry.toJSON()))
    })
    
})

blogRouter.post('/', (req, res, next) => {
console.log(req.body)
const blog = new Blog(req.body)
blog
  .save()
  .then(result => {
    res.status(201).json(result)
  })
  .catch(error => next(error))
})

blogRouter.delete('/:id', (req, res, next) => {
const id =  req.params.id
console.log(id)

Blog
.findByIdAndDelete(id)
.then(response => {
  res.status(204).end()
})
.catch(error => next(error))
})

blogRouter.put('/:id', (req, res, next) => {
const id = req.params.id
const body = req.body

const newBlog = {
  title: body.title,
  author: body.author,
  url: body.url,
  likes: body.likes
}

Blog
.findByIdAndUpdate(id, newBlog, { new: true })
.then(updatedBlog =>{
  res.json(updatedBlog.toJSON).end
})
.catch(error => next(error))
})

module.exports = blogRouter