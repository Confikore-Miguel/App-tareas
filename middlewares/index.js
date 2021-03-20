
const validarCampos = require('./validar-campos');
const validarToken = require('./validar-token');
const validarRol = require('./validar-rol');
const validarArchivo = require('./validar-archivo');

module.exports={
    ...validarCampos,
    ...validarToken,
    ...validarRol,
    ...validarArchivo,
}