
function errorHandling(err, req, res, next) {
  let message
  let status
  switch(err.name) {
    case 'loginError':
      res.status(401).json({ message: err.message })
      break
    case 'empty field':
      res.status(400).json({ message: err.message })
      break
    case 'SequelizeValidationError':
      let newMessage = err.message.split('\n')
      res.status(400).json({message: newMessage })
      break
    case 'cannot find product':
      res.status(400).json({ message: err.message })
      break
    case 'JsonWebTokenError':
      if(err.message === 'invalid signature') {
        status = 401
        message = 'Not Authenticate'
        res.status(status).json({ message })
      }
      else {
        res.status(400).json({ message: err.message })
      }
      break
    case 'SequelizeDatabaseError':
      message = 'wrong input data type'
      res.status(400).json({ message })
      break
    case 'Over Quantity':
      res.status(400).json({ message: err.message })
      break
    case 'SequelizeUniqueConstraintError':
      message = err.errors[0].message
      res.status(400).json({ message })
      break
    case 'not found':
      message = 'error not found'
      status = 400
      res.status(status).json({ message })
      break
    default:
      res.status(500).json({ message: 'internal server serror'})
  }
}


module.exports = errorHandling