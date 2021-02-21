if(process.env.NODE_ENV ===' development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME_DEV,
    "password": process.env.DB_PWD_DEV,
    "database": process.env.DB_DATABASE_DEV,
    "host": process.env.DB_HOST_DEV,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME_TEST,
    "password": process.env.DB_PWD_TEST,
    "database": process.env.DB_DATABASE_TEST,
    "host": process.env.DB_HOST_TEST,
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "postgres://mzqnlzwmcgzbag:6af2b65d9193db7af09c86cce9bc58aca40391c667434cab259a07f0577abb9a@ec2-18-204-74-74.compute-1.amazonaws.com:5432/dbihuogomaudue"
  }
}
