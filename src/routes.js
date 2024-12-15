const { Router }  = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');
const UserController = require('./apps/controllers/UserController');

const routes = new Router();

routes.post('/user', schemaValidator(), UserController.create);

routes.get('/health', (req, res) =>  res.send({
    message: 'Connected with success!',
}));

module.exports = routes; 