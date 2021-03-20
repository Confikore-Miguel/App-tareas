const  bcryptjs= require('bcryptjs');

const Usuario = require('../models/users.schema');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res )=>{
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({email});
    
        if( !usuario ){
            return res.status(400).json({msg:'email/password son incorrectos'});
        }
        if( !usuario.estado ){
            return res.status(400).json({msg:'email/password son incorrectos'});
        }
        const compare= bcryptjs.compareSync(password, usuario.password);
        if ( !compare ){
            return res.status(400).json({msg:'email/password son incorrectos'})
        }
        
        const token = await generarJWT(usuario._id);
        res.json({ token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'Hable con el administrador'});
    }
}

module.exports={
    login
}
