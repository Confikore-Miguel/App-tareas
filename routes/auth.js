const { Router } =require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');
const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min: 6}),
    validarCampos
],login );


module.exports= router;