const Sequelize = require('sequelize');
const Users = require('../apps/models/Users');
const Posts = require('../apps/models/Posts');

const models = [Users, Posts];
const databaseConfig = require('../configs/db');

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

module.exports = new Database();