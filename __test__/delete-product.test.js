const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const getToken = require('../helpers/jwt')

describe('testing delete product', function(){

  let access_token = getToken({ id: 1, email: 'admin@mail.com', role: 'admin' })
  let productId
  beforeAll((done) => {

    const body =  {
      name: 'Racket A',
      image_url : 'https://shop.wilson.com', 
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
        productId = res.body.id
      }
    })
    return done()
  })

  afterAll((done) => {
    sequelize.close()
    return done()
  })

  it('should return status 200 and a message if success to delete prodcut', function(done) {
    
    request(app)
    .delete(`/products/${productId}`)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(200)
        expect(res.body).toContain('successfully delete product')
      }
    })
    return done()
  })

  it('should return status 401 and a message if there is no access token given', function(done) {
    
    request(app)
    .delete(`/products/${productId}`)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(401)
        expect(res.body).toContain('invalid')
      }
    })
    return done()
  })

  it('should return status 401 and a message if the access token given is wrong', function(done) {
    
    access_token ='a'

    request(app)
    .delete(`/products/${productId}`)
    .set('access_token', access_token)
    .end((err, res) => {
      if(err) {
        return done(err)
      }
      else {
        expect(res.status).toEqual(401)
        expect(res.body).toContain('invalid')
      }
    })
    return done()
  })

})