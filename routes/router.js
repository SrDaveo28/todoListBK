const express = require('express');
const { check } = require('express-validator');

const tarea_controller = require('../controller/dbTareas');
const usuario_controller = require('../controller/dbUsuarios');
const auth_controller = require('../controller/dbAuth');

const { esRolValido, existeEmail, existeUsuarioPorId, prioridadValido } = require('../helpers/db-validators');
/* const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, roleDelete } = require('../middlewares/validar-roles');
 */

const { validarCampos, validarJWT, esAdminRole, roleDelete } = require('../middlewares');

const route = express.Router();

//Tareas
route.get('/api/tareaGet/:id', tarea_controller.getTareaById);
route.get('/api/tareasGetUser/:user', tarea_controller.getTareaByUser);

route.get('/api/tareasAll', tarea_controller.tareasAll);
route.post('/api/tarea',
    check('prioridad').custom(prioridadValido)
    , tarea_controller.tareaPost);
route.put('/api/tarea/:id', tarea_controller.tareaPut);
route.put('/api/tareaActions/:id', tarea_controller.tareaPutActions);
route.put('/api/tareaDelete/', tarea_controller.tareaPutDelete);

//Usuarios
route.post('/api/usuarioPost', [
    check('email', 'El correo no es valido').isEmail(),
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    //check('password', 'El Password').isLength({min:6}),
    //check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE', 'TECH_ROLE', 'PLANNING_ROLE']),
    check('email').custom(existeEmail),
    check('role').custom(esRolValido),
    validarCampos
]
    , usuario_controller.usuarioPost);

route.put('/api/usuarioPut/:id',/* [
   check('id', 'El id NO ES valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
 validarCampos
]*/ usuario_controller.usuarioPut);

route.get('/api/usuarioGet/', usuario_controller.usuarioGet);

route.delete('/api/usuarioDel/:id',
    [
        validarJWT,
        //  esAdminRole, // ONLY ADMIN CAN DELETE

        roleDelete('ADMIN_ROLE', 'TECH_ROLE', 'PLANNING_ROLE'),
        validarCampos]
    , usuario_controller.usuarioDelete);

//login
route.post('/api/auth/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], auth_controller.login);


module.exports = route;