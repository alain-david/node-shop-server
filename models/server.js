const express = require('express');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';

        //Conectar a la BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //Lectura y parseo del body
        this.app.use( express.json());

        //Directorio Publico
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Escuchando en el puerto', this.port);
        })
    }
}

module.exports = Server;