
function errorHandling(err, req, res, next) {
  console.log(err)
  let message
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
      res.status(401).json({ message: err.message })
      break
    case 'SequelizeDatabaseError':
      message = 'wrong input data type'
      res.status(400).json({ message })
      break
    case 'Over Quantity':
      res.status(400).json({ message: err.message })
    default:
      res.status(500).json({ message: 'internal server serror'})
  }
}


module.exports = errorHandling