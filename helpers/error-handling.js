
function errorHandling(err, req, res, next) {

  switch(err.name) {
    case 'loginError':
      res.status(401).json({ message: err.message })
      break
    case 'empty field':
      res.status(401).json({ message: err.message })
  }
}


module.exports = errorHandling