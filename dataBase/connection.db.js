const mongoose = require('mongoose');

const connection = async()=>{
    try {
        await mongoose.connect('mongodb+srv://user_node_cafe:akIVtKPV2lsLGLnA@miclustercafe.gp2wt.mongodb.net/TareaDB',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Data base online');
    } catch (error) {
        throw new Error('No se pudo conectar a la base de datos');
    }
} 
module.exports={ 
    connection 
};