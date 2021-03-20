const { request } = require('express')

const  jwt = require('jsonwebtoken');
const { Usuario } = require("../models");

const validarToken = async(req = request, res , next )=>{
     
    const token = req.header('x-token');
    try {
        if( !token){
            return res.status(401).json({msg:'no hay token en la peticion'})
        }
        const { id }= jwt.verify(token,process.env.SECRETEKEY);
        const usuario = await Usuario.findById(id);
        if ( !usuario ){
            return res.status(401).json({msg:'Token no valido - no'})
        }
        if ( !usuario.estado ){
            return res.status(401).json({msg:'Token no valido-false'})
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        return res.status(401).json({
            msg:'Token no valido'
        })
    }
}

module.exports= {
    validarToken
}