const morgan = require('morgan')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

const morganMiddleware = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req,res)
  ].join(' ')
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    return res.status(400).send({error: 'malformatted id'})
  }else if (error.name === 'ValidationError'){
    return res.status(400).send({ error:error.message })
  }else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (req, res, next) => {
  const token = getTokenFrom(req)
  req.token = token
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  morganMiddleware,
  tokenExtractor
}