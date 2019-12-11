const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Blog = require('./models/blog')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
 
app.use(middleware.morganMiddleware)

// ----------------- ROUTE HANDLERS --------------------

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
    
app.get('/api/blogs', (req, res) => {
    Blog
      .find({})
      .then(blogs => {
        res.json(blogs.map(entry => entry.toJSON()))
      })
      
  })
  
app.post('/api/blogs', (req, res, next) => {
  console.log(req.body)
  const blog = new Blog(req.body)
  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

app.delete('/api/blogs/:id', (req, res, next) => {
  const id =  req.params.id
  console.log(id)

  Blog
  .findByIdAndDelete(id)
  .then(response => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/blogs/:id', (req, res, next) => {
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

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = config.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})