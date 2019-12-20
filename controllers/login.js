const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

loginRouter.post('/', async(req, res, next) =>{
  try{
    const body = req.body
    
    const foundUser = await User.findOne({username: body.username})

    const correctPassword = foundUser === null
      ? false
      : await bcrypt.compare(body.password, foundUser.passwordHash)
  
    if(!(foundUser && correctPassword)){
      return res.status(401).json({
        error: 'invalid password'
      })
    }

    const tokenOfUser = {
      username: foundUser.username,
      id: foundUser._id
    }

    const token = jwt.sign(tokenOfUser, process.env.SECRET)

    res
      .status(200)
      .send({
        token,
        username: foundUser.username,
        name: foundUser.name
    })
  }catch(exception){
    next(exception)
  }
})

module.exports = loginRouter