const { Router }  = require('express');
const UserModel = require('./apps/models/Users');

const routes = new Router();

routes.get('/users', async (req, res) => {
    const allUsers = await UserModel.findAll();
    res.send({ users: allUsers });
});

routes.get('/health', (req, res) =>  res.send({
    message: 'Connected with success!',
}));

module.exports = routes;