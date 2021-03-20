var jwt = require('jsonwebtoken');
const generarJWT = async( id ='')=>{

    return new Promise ((resolve, reject )=>{
        const payload = { id };
        jwt.sign(payload ,process.env.SECRETEKEY,{
            expiresIn:'10h'
            },(err, token )=>{
                if( err ){
                    console.log('No se pudo generar el token ');
                    reject( err );
                }else{
                    resolve( token );
                } 
            }
        )
    });
}


module.exports ={
    generarJWT
}
