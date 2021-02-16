const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')


describe('testing user login, ', function() {
  
  it('should return status 200 when email and password inputed was correct', function(done) {
    const body = { email: 'admin@mail.com', password: '1234' }
    request(app)
    .post("/users/login")
    .send(body)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('access_token')
        return done()
      }
    })
  })

  it('should return status 401 when input password was wrong', function(done) {
    const body = { email: 'admin@mail.com', password: '12345' }
    request(app)
    .post("/users/login")
    .send(body)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(401)
        expect(res.body).toEqual({ message: 'Invalid Email or Password' })
        return done()
      }
    })
  })

  it('should return status 401 when input email was wrong', function(done) {
    const body = { email: 'adminsalah@mail.com', password: '1234' }
    request(app)
    .post("/users/login")
    .send(body)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(401)
        expect(res.body).toEqual({ message: 'Invalid Email or Password' })
        return done()
      }
    })
  })

  it('should return status 401 when there is no any input', function(done) {
    const body = { email: '', password: '' }
    request(app)
    .post("/users/login")
    .send(body)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(401)
        expect(res.body).toEqual({ message: 'Field cannot empty' })
        return done()
      }
    })
  })
})

afterAll(function () {
  sequelize.close();
 });