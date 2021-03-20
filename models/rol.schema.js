const { Schema, model } = require('mongoose');

const schemaRol= Schema({
    rol:{
        type:String,
        required:[true,'El rol es obligatorio']
    }
});

module.exports=model('Role', schemaRol); 