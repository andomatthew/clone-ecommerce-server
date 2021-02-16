const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

describe('testing create product', function() {
  
  let access_token
  
  beforeAll((done) => {
    const body = { email: 'admin@mail.com', password: '1234' }

    request(app)
    .post("/users/login")
    .send(body)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      access_token = res.body.access_token
      return done()
    })
  })

  afterAll((done) => {
    sequelize.close()
    return done()
  })

  it('should return status 201 and object data type when success creating product', function(done) {
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: 5 
    }
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('image_url')
        expect(res.body.price).toBeGreaterThan(0)
        expect(res.body.stocks).toBeGreaterThan(0)
      }
    })
    return done()
  })

  it('should return status 401 and message if theres no access token given', function(done) {
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: 5 
    }
    request(app)
    .post('/products')
    .send(body)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(401)
        expect(res.body.message).toEqual('message')
      }
    })
    return done()
  })

  it('should return status 401 and a message if theres is access token but the role is not admin', function(done) {
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: 5 
    }
    access_token += 'a'

    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('message')
      }
    })
    return done()
  })

  it('should return status 400 and a message if there is field required and its empty', function(done) {
    const body =  {
      name: '',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: 5 
    }
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('message')
      }
    })
    return done()
  })

  it('should return status 400 if the stock input is below than 0', function(done) {
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: -1 
    }
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('message')
      }
    })
    return done()
  })

  it('should return status 400 if the price input is below 0', function(done) {
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: -10000,
      stocks: 5 
    }
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('message')
      }
    })
    return done()
  })

  it('should return status 400 if the data type did not match', function(done) {
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: '10' 
    }
    request(app)
    .post('/products')
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(201)
        expect(res.body).toHaveProperty('message')
      }
    })
    return done()
  })
})


