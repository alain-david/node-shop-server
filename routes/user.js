const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const { esRoleValido, phoneValido, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('phone', 'El phone es obligatorio').not().isEmpty(),
    check('phone').custom( phoneValido ),
    check('password', 'El password debe d ser d más d 6 letras').isLength({ min: 6 }),
    check('role').custom( esRoleValido ),
    validarCampos
],usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    // tieneRole('ADMIN','VENDEDOR'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos 
], usuariosDelete);

module.exports = router;