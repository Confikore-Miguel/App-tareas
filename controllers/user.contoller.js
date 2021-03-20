const { request , response } = require('express');
const bcryptjs= require('bcryptjs');
const Usuario = require('../models/users.schema');

const getUsers = async(req= request, res=response) =>{

    const { limite=5, desde=0 }= req.query;
    const query = { estado: true };

    const[ total , usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    })
}

const getUser = async(req= request, res=response) =>{

    const { id } = req.params;

    const usuario= await Usuario.findById(id);

    res.json({usuario})
}

const postUser = async(req= request, res=response) =>{

    const {name,last_name,email,password,rol} = req.body;
    console.log(rol);
    const data = {
        name,
        last_name,
        email,
        password,
        rol:rol.toLowerCase()
    }
    console.log(data);
    const user = new Usuario(data);

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password,salt);
    await user.save();

    res.json({
        usuario_registrado:user
    })
}

const putUserUpdate = async (req= request, res=response) =>{

    const { id } = req.params;
    const {estado,google,_id ,...resto} = req.body;

    const data ={
        name:  resto.name,
        last_name: resto.last_name ,
        email: resto.email,
        password :resto.password,
        rol: resto.rol.toLowerCase()
    }
    const usuarioUpdate =  await Usuario.findByIdAndUpdate(id,data,{new:true})
    
    res.json({usuario_actualizado:usuarioUpdate})
}

const deleteUser = async(req= request, res=response) =>{
    const { id } = req.params;
    
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false},{next: true});

    res.json({usuario})
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    putUserUpdate,
    deleteUser
}