const config = require('../utils/config')
const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const mongoUrl = config.MONGODB_URI

mongoose.set('useFindAndModify', false)

const userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  name: String,
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(validator)

module.exports = mongoose.model('User', userSchema)