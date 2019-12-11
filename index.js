require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Blog = require('./models/blog')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
 

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req,res)
  ].join(' ')
}))

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

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error)
  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    return res.status(400).send({error: 'malformatted id'})
  }else if (error.name === 'ValidationError'){
    return res.status(400).send({ error:error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})