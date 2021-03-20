const  { Rol ,Usuario, Tarea }  = require('../models')

const existeID = async ( id ='' )=>{
    const existe = await Usuario.findById(id);
    
    if( !existe || existe.estado === false ){
        throw new Error(`El id '${ id }' no existe`);
    }
}
const existeRol = async ( rol ='' )=>{
    const existe = await Rol.findOne({rol:rol.toLowerCase()});
    console.log(existe);
    if( !existe ){
        throw new Error(`El rol '${ rol }' no existe`);
    }
}
const existeEmail = async( email= '')=>{
    const exist = await Usuario.findOne({ email });
        if ( exist ){
            throw new Error(`El correo '${ email }' ya esta registrado `);
        } 
} 
const existeIDtarea = async ( id ='' )=>{
    const existe = await Tarea.findById(id);
    if( existe.estado === false ){
        throw new Error(`La tarea ya ha sido tomada`);
    }
    if( !existe || existe.estado === false ){
        throw new Error(`El id '${ id }' no existe`);
    }
}

const coleccionesPermitidas= ( coleccion='', colecciones=[])=>{
    const incluida = colecciones.includes(coleccion);
    if ( !incluida ){
        throw new Error(`La coleccion '${coleccion}' no es permitida, son permitidas : ${ colecciones }`)
    }
    return true;
}



module.exports= {
    existeID,
    existeRol,
    existeEmail,
    existeIDtarea,
    coleccionesPermitidas
}