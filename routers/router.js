const express = require ('express')
const Router = express.Router()

const{controller} = require ('./../controllers')

Router.post('/register', controller.register)
Router.post('/login', controller.login)
Router.post('/picture', controller.postPicture)
Router.post('/product', controller.postProduct)
Router.post('/detail', controller.postDetail)
Router.post('/detail-size', controller.postDetailSize)
Router.get('/products', controller.getProduct)

module.exports = Router