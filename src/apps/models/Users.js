const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Users extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                user_name: Sequelize.STRING,
                email: Sequelize.STRING,
                avatar: Sequelize.STRING,
                bio: Sequelize.STRING,
                gender: Sequelize.STRING,
                password_hash: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
            },
            {
                sequelize, 
            },
        );
        return this;
    }
}

module.exports = Users;