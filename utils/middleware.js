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
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  morganMiddleware
}