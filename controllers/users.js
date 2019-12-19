const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.post('/', async (req, res, next)=> {
  try{
    const body = req.body
    const saltRound = 10

    if(!body.password){
      let error = Error('Validation error: password field missing')
      error.name = 'ValidationError'
      throw error
    }
    if(body.password.length < 3){
      let error = Error('Validation error: Your password is too short, it must 3 or more characters long')
      error.name = 'ValidationError'
      throw error
    }

    const passwordHash = await bcrypt.hash(body.password, saltRound)

    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUsed = await newUser.save()

    res.json(savedUsed)

  }catch(exception){
    next(exception)
  }
})

usersRouter.get('/', async (req, res, next)=> {
  const savedUsers = await User.find({})
  res.json(savedUsers.map(user => user.toJSON()))
})

module.exports = usersRouter