const { User } = require('../models/')
const { comparePassword } = require('../helpers/bcrypt')
const getToken  = require('../helpers/jwt')


class UserController {

  static register (req, res, next) {
    const { email, password } = req.body
    User.create({ email, password })
    .then(newUser => {
      res.status(201).json({ id: newUser.id, email: newUser.email })
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body
    if(email === '' || password === '') throw {name: 'empty field', message: 'Field cannot empty'}
    User.findOne({ where: { 'email': email } })
    .then(user => {
      if(!user || !comparePassword(password, user.password)) throw { name: 'loginError', message: 'Invalid Email or Password'}
      const access_token = getToken({ id: user.id, email: user.email, role: user.role })
      res.status(200).json({ id: user.id, email: user.email, access_token })
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = UserController