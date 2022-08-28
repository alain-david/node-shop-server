const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(role = '') => {
    const existeRole = await Role.findOne({role});
    if(!existeRole){
        throw new Error(`El role ${role} no está definido en la BD`);
    }
}

const phoneValido = async(phone = '') => {
    const existePhone = await Usuario.findOne({ phone });
    if( existePhone ){
        throw new Error(`El phone: ${phone}, está en uso`);
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`El id: ${ id }, no existe`);
    }
}

module.exports = {
    esRoleValido,
    phoneValido,
    existeUsuarioPorId
}