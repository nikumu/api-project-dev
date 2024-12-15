const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const Users = require('../models/Users');

class AuthenticationController {
    async authenticate(req, res){
        const { email, user_name, password } = req.body;

        let whereClause = {};
        if (email) {
            whereClause = { email };
        } else if (user_name) {
            whereClause = { user_name };
        } else {
            return res.status(401).json({ error: 'We need a e-mail or password!' });
        }

        const verifyUser = await Users.findOne({
            where: whereClause,
        });

        if (!verifyUser) {
            return res.status(401).json({ error: 'User not found!' });
        }

        return res.status(200).json({ user: verifyUser });
    }
}

module.exports = new AuthenticationController();