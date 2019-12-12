const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
app.use(middleware.morganMiddleware)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = config.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})