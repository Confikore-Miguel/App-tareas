const { Router } =require('express');
const { check } = require('express-validator')

const { validarCampos, validarToken } = require('../middlewares');
const { existeID, existeEmail, existeRol } = require('../helpers');

const { getUsers,
        getUser,
        postUser,
        putUserUpdate,
        deleteUser } = require('../controllers/user.contoller');

const router = Router();

//info de usuarios
router.get('/', getUsers );
//info de usuario
router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeID),
    validarCampos
], getUser );

//Registrar
router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('last_name','El apellido es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    check('email','El correo es obligatorio').isEmail(),
    check('email').custom( existeEmail ),
    check('rol').custom( existeRol ),
    validarCampos
], postUser );
//actualizar user
router.put('/:id',[
    validarToken,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeID),
    validarCampos
], putUserUpdate );

//eleminar user
router.delete('/:id',[
    validarToken,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeID),
    validarCampos
],deleteUser );

module.exports= router;
