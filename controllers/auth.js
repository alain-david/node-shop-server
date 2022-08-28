const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res = response) => {
    const { phone, password } = req.body;
   
    try {
        //Verificar si el phone existe
        const usuario = await Usuario.findOne( { phone });
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - phone'
            });
        }
        
        //Si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - stado: false'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            }); 
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        })
        
    } catch (error) {
       console.log(error)
       return res.status(500).json({
            msg: 'Hable con el administrador'
       })
    }
}

module.exports = {
    login
}
