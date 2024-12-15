const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const Users = require('../models/Users');

class AuthenticationController {
    async authenticate(req, res){
        const { email, user_name, password } = req.body;

        const verifyUser = await Users.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { user_name },
                ],
            },
        });

        if (!verifyUser) {
            return res.status(401).json({ error: 'User not found!' });
        }

        return res.status(200).json({ user: verifyUser });
    }
}

module.exports = new AuthenticationController();