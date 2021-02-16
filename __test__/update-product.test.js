const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')


describe('testing updating product', function() {
  
  let access_token
  let productId

  beforeAll((done) => {

    const body = { email: 'admin@mail.com', password: '1234' }
    const input =  {
      name: 'Racket B',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: 5 
    }

    request(app)
    .post("/users/login")
    .send(body)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      access_token = res.body.access_token
    })

    
    request(app)
    .post('/products')
    .send(input)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        productId = res.body.id
      }
    })
    return done()
  })


  afterAll((done) => {
    sequelize.close()
    return done()
  })

  it('should return 200 and an object if success to edit product', function(done) {
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: 5 
    }
    request(app)
    .put(`/products/${productId}`)
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('image_url')
        expect(res.body.price).toBeGreaterThan(0)
        expect(res.body.stocks).toBeGreaterThan(0)
      }
    })
    return done()
  })

  it('should return status 200 and an object if success updating product', function(done){
    const body =  {
      stocks: 5 
    }
    request(app)
    .patch(`/products/${productId}`)
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(200)
        expect(res.body.stocks).toBeGreaterThan(0)
      }
    })
    return done()
  })

  it('should return status 401 and a message if theres no access token given', function(done){
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: 5 
    }

    request(app)
    .put(`/products/${productId}`)
    .send(body)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(401)
        expect(res.body).toHaveProperty('message')
      }
    })
    return done()
  })

  it('should return status 401 and a message if access token given is wrong', function(done){
    const body =  {
      name: 'Racket A',
      image_url : 'https://shop.wilson.com', 
      price: 10000,
      stocks: 5 
    }
    
    access_token += 'a'

    request(app)
    .put(`/products/${productId}`)
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(401)
        expect(res.body).toHaveProperty('message')
      }
    })
    return done()
  })

  it('should return status 400 and a message if stocks set below 0', function(done){
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: -10 
    }

    request(app)
    .put(`/products/${productId}`)
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(400)
        expect(res.body).toHaveProperty('message')
      }
    })
    return done()
  })

  it('should return status 400 and a message field data type did not match', function(done){
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: 10000,
      stocks: '10' 
    }

    request(app)
    .put(`/products/${productId}`)
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(400)
        expect(res.body).toHaveProperty('message')
      }
    })
    return done()
  })

  it('should return status 400 and a message if price set below 0', function(done){
    const body =  {
      name: 'Racket A',
      image_url : 'https://www.bigw.com.au/medias/sys_master/images/images/h70/h7d/14401110638622.jpg', 
      price: -10000,
      stocks: 10 
    }

    request(app)
    .put(`/products/${productId}`)
    .send(body)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(401)
        expect(res.body).toHaveProperty('message')
      }
    })
    return done()
  })

})