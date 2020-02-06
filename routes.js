const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const lembreteController = require('./src/controllers/lembreteController')

// Rotas da home
route.get('/', homeController.index);

//Rotas de Login
route.get('/loginRota/index', loginController.index)
route.get('/loginRota/logout', loginController.logout)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)

//Rotas para os lembretes
route.get('/lembrete', lembreteController.index)
route.post('/lembrete/register', lembreteController.register)
module.exports = route;
