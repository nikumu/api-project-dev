const { Router }  = require('express');
const { upload } = require('./configs/multer');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('./apps/middlewares/authentication');

const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authSchema = require('./schema/auth.schema.json');

const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json')

const routes = new Router();

routes.post('/user', schemaValidator(userSchema), UserController.create);

routes.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate);

routes.get('/health', (req, res) =>  res.send({
    message: 'Connected with success!',
}));

routes.use(AuthenticationMiddleware);

routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);
routes.get('/user-profile', UserController.userProfile);

routes.get('/upload', upload.single('image'));

module.exports = routes; 