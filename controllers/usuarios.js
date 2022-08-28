const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {
    
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip( Number( desde ))
            .limit( Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req, res = response) => {
    
    const {nombre, phone, password, role } = req.body;
    const usuario = new Usuario({ nombre, phone, password, role });

    //Encryptar el password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = async(req, res = response) => {
    
    const id = req.params.id;
    const { _id, phone, password, ...resto } = req.body;

    if( password ) {
       //Encryptar el password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt ); 
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json(usuario)
}

const usuariosDelete = async(req, res = response) => {
    
    const id = req.params.id;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    
    res.json(usuario)
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}