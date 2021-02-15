const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

function hashPassword(password) {
  return bcrypt.hashSync(password, salt)
}

function comparePassword(input, database) {
  return bcrypt.compareSync(input, database)
}

module.exports = { hashPassword, comparePassword }