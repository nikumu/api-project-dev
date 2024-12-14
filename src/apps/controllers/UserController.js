const Users = require('../models/Users');

class UserController {
    async create(req, res) {
        const allUsers = await Users.findAll();
        res.send({ users: allUsers });
    }
}

module.exports = new UserController();