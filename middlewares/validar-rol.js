const leaderRole = async ( req, res , next )=>{

    const { rol }= req.usuario;
    if( !req.usuario ){
        return res.status(500).json({
            msg:'Se quiere realizar esta accion sin haber verificado primero el token'
        })
    }
    if( rol !== 'leader'){
        return res.status(400).json({
            msg:'No tiene permitido realizar esta accion'
        })
    }
    next();
}
module.exports={
    leaderRole
}