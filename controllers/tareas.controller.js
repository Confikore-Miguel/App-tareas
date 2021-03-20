const { Tarea } = require('../models');

const obtenerTareas =  async(req,res)=>{

    const { limite=5, desde=0 } = req.query;
    const query = {estado:true};

    const [ total, tareas ] = await Promise.all([
        Tarea.countDocuments(query),
        Tarea.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
            .populate({path:'creador',select:['name','last_name']})
    ]);
    
    res.json({
        total,
        tareas
    });
}
const tomadoPor =  async(req,res)=>{
    const { id } = req.params;

    const data = {
        tomado_por:req.usuario._id,
        estado:false
    }
    const tarea = await Tarea.findByIdAndUpdate(id,data,{new:true})
        .populate('creador','name')
        .populate('tomado_por','name')  
    
    res.json({
        tarea
    });
}

const tarea = async (req, res)=>{
    const { titulo , descripcion }= req.body;
    const data ={
        titulo,
        descripcion,
        creador: req.usuario._id
    }
    const tarea = new Tarea(data);
    // await tarea.save();
    res.json({tarea})
}

const deleteTarea = async (req, res )=>{
    const { id } = req.params;

    const tarea = await Tarea.findByIdAndDelete(id);

    res.json({tarea})
}
module.exports={
    tarea,
    obtenerTareas,
    tomadoPor,
    deleteTarea
}