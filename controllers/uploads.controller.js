var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { Usuario, Tarea } = require('../models')

const subirImg= async(req, res)=>{
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuario':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                res.status(400).json({
                    msg:`No existe un producto con el id '${id}'`
                })
            }
            break;
        case 'tarea':
            modelo = await Tarea.findById(id);
            if( !modelo ){
                res.status(400).json({
                    msg:`No existe un producto con el id '${id}'`
                })
            }
            break;
        default:
            return res.status(500).json({msg:'No se ha validado lo requerido '})
    }

    if ( modelo.img ){
        userImgArr= modelo.img.split('/');
        idImg = userImgArr[userImgArr.length -1];
        const [ id_image ]= idImg.split('.');
        console.log( id_image );
        cloudinary.uploader.destroy( id_image );
    }

    const { tempFilePath } = req.files.archivo;
    const guardarImg = await cloudinary.uploader.upload(tempFilePath);
    const { secure_url } = guardarImg;
    modelo.img = secure_url;
    modelo.save();

    res.json({modelo});
}


const deleteImage= async( req, res )=>{

    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuario':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                res.status(400).json({
                    msg:`No existe un producto con el id '${id}'`
                })
            }
            break;
        case 'tarea':
            modelo = await Tarea.findById(id);
            if( !modelo ){
                res.status(400).json({
                    msg:`No existe un producto con el id '${id}'`
                })
            }
            break;
        default:
            return res.status(500).json({msg:'No se ha validado lo requerido '})
    }

    userImgArr= modelo.img.split('/');
    idImg = userImgArr[userImgArr.length -1];
    const [ id_image ]= idImg.split('.');
    console.log( id_image );
    cloudinary.uploader.destroy( id_image );
    
    res.json({msg:'imagen eliminada'});
}


module.exports= {
    subirImg,
    deleteImage
}