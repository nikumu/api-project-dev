const { Router }  = require('express');
const UserController = require('./apps/controllers/UserController');

const routes = new Router();

routes.get('/users', UserController.create);

routes.get('/health', (req, res) =>  res.send({
    message: 'Connected with success!',
}));

module.exports = routes; 