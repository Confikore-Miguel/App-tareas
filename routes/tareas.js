const { Router } =require('express');
const { check } = require('express-validator');

const { tarea,obtenerTareas, tomadoPor, deleteTarea } = require('../controllers/tareas.controller');
const { existeIDtarea } = require('../helpers/validar-existencia');

const { leaderRole,validarCampos,validarToken } = require('../middlewares');

const router = Router();

router.get('/', obtenerTareas );

router.post('/',[
    validarToken,
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion es obligatoria').not().isEmpty(),
    leaderRole,
    validarCampos
], tarea );


router.put('/:id',[
    validarToken,
    leaderRole,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeIDtarea),
    validarCampos
], tomadoPor );

router.delete('/:id',[
    validarToken,
    leaderRole,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeIDtarea),
    validarCampos
],deleteTarea )


module.exports= router;