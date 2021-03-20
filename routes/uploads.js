const { Router } =require('express');
const { check } = require('express-validator');

const { subirImg, deleteImage } = require('../controllers/uploads.controller');
const { existeID, coleccionesPermitidas} = require('../helpers')
const { validarArchivo, validarCampos, validarToken } = require('../middlewares')

const router = Router();

router.post('/:coleccion/:id',[
    validarToken,
    validarArchivo,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeID),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuario','tarea'])),
    validarCampos
], subirImg );
router.delete('/:coleccion/:id',[
    validarToken,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeID),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuario','tarea'])),
    validarCampos
], deleteImage );


module.exports= router;