const config = require('../utils/config')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const mongoUrl = config.MONGODB_URI

mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
  title: {type: String, required: true, minlength: 3},
  author: {type: String, minlength:3},
  url: {type: String, required: true, unique: true},
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

blogSchema.set('toJSON', {
transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
}
})

blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)