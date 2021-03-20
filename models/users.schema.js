const { Schema, model } = require('mongoose');

const schemaUser = Schema({
    name:{
        type:String,
        required:[true,'El nombre es oblogatorio'] 
    },
    last_name:{
        type:String,
        required:[true,'El apellido es oblogatorio'] 
    },
    email:{
        type:String,
        required:[true,'El correo es oblogatorio'],
        unique: true 
    },
    password:{
        type:String,
        required:[true,'La contraseña es oblogatorio'] 
    },
    rol:{
        type:String,
        default:'FOLLOWER_ROLE'
    },
    img:{
        type:String
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false 
    }
});

schemaUser.methods.toJSON = function() {
    const { __v, password,estado,google, ...user} = this.toObject();
    return user;
}

module.exports = model('User', schemaUser);