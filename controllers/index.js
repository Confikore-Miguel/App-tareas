const login = require('./auth.controller');
const userController = require('./user.contoller');
const uploads = require('./uploads.controller');

module.exports={
    ...login,
    ...userController,
    ...uploads
}