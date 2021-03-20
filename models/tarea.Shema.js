const { Schema, model } = require('mongoose');

const schemaTarea= Schema({
    titulo:{
        type:String,
        required:[true,'El titulo es obligatorio']
    },
    descripcion:{
        type:String,
        required:[true,'La descripción es obligatoria']
    },
    estado:{
        type:Boolean,
        default: true
    },
    img:{type:String},
    creador:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tomado_por:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

schemaTarea.methods.toJSON= function (){
    const { estado,__v, ...tarea }= this.toObject();
    return tarea;
}

module.exports=model('Tarea', schemaTarea); 