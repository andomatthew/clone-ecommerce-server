
function errorHandling(err, req, res, next) {
  // console.log(err.message)
  switch(err.name) {
    case 'loginError':
      res.status(401).json({ message: err.message })
      break
    case 'empty field':
      res.status(401).json({ message: err.message })
      break
    case 'SequelizeValidationError':
      let newMessage = err.message.split('\n')
      res.status(400).json({message: newMessage })
      break
  }
}


module.exports = errorHandling