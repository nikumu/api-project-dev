const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { encrypt } = require('../../utils/crypt');

class AuthenticationController {
    async authenticate(req, res) {
        const { email, user_name, password } = req.body;

        let whereClause = {};
        if (email) {
            whereClause.email = email;
        } else if (user_name) {
            whereClause.user_name =  user_name;
        } else {
            return res.status(401).json({ error: 'We need a e-mail or username!' });
        }

        const user = await Users.findOne({
            where: whereClause,
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found!' });
        }

        if(!await user.checkPassword(password)) {
            return res.status(401).json({ error: 'Password does not match!' });
        }

        const { id, user_name: userName } = user;

        const { iv, content } = encrypt(id);

        const newId = `${iv}:${content}`;

        const token = jwt.sign({ userId: newId }, process.env.HASH_BCRYPT, {
            expiresIn: process.env.EXPIRE_IN,
        });

        return res.status(200).json({ user: { id, user_name: userName }, token });
    }
}

module.exports = new AuthenticationController();
