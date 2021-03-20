

const existeID = require('./validar-existencia');
const generarJWT = require('./generar-jwt');
const usuarioPropio = require('./usuario-propio');


module.exports = {
    ... existeID,
    ... generarJWT,
    ... usuarioPropio,
}