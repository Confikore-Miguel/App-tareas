

const existeID = require('./validar-existencia');
const generarJWT = require('./generar-jwt');


module.exports = {
    ... existeID,
    ... generarJWT,
}