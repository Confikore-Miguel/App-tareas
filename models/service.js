const cors = require('cors');
const express = require('express');
const { connection } = require('../dataBase/connection.db');
const fileUpload = require('express-fileupload');


class Service{

    constructor(){
      this.app = express();
      this.port = process.env.PORT;
      this.paths = {
          auth: '/api/auth',
          tareas:'/api/tarea',
          users:'/api/users',
          uploads:'/api/uploads',
      }
      this.dataBase();
      this.middlewares();
      this.routes();
    }

    listen(){
      this.app.listen(this.port, ()=>{
        console.log("LocalHost corriendo", this.port);
      })
    }

    routes(){
      this.app.use(this.paths.auth, require('../routes/auth'));
      this.app.use(this.paths.tareas, require('../routes/tareas'));
      this.app.use(this.paths.users, require('../routes/users'));
      this.app.use(this.paths.uploads, require('../routes/uploads'));
    }
    
    middlewares(){
      this.app.use( cors() );
      //parsea las request a json 
      this.app.use( express.json() );
      this.app.use(express.static('public'));
      this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
      }));
    }

    async dataBase(){
      await connection();
    }
}


module.exports= Service;