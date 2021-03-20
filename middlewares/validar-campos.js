const { validationResult } = require('express-validator');

const validarCampos = (req, res, next)=>{

    const errors = validationResult( req );
    //isEmpty = si no hay erroes
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    // next dice que continue con el siguiente o lo que le prosigue
    next();
}

module.exports={
    validarCampos
}