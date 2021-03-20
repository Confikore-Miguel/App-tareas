require('dotenv').config()
const Service = require('./models/service');
 
const service = new Service();

service.listen();