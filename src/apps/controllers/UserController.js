const Users = require('../models/Users');

class UserController {
    async create(req, res) {
        const verifyUser = await Users.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (verifyUser) {
            return res.status(400).json({ message: 'User already exits!'});
        }

        const user = await Users.create(req.body);
        res.send({ user });
    }
}

module.exports = new UserController();