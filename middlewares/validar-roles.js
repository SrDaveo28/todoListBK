const { response } = require('express');


const esAdminRole = (req, res = response, next) => {   // eslint-disable-line

    console.log('el req.ususario', req.usuario);


    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { role, name } = req.usuario;


    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({ msg: `${name} No es administrador - NO TIENE PERMISO` });
    }

    next();

};


const roleDelete = (...roles) => {

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.role)) {

            return res.status(401).json({ msg: `No tiene permiso para eliminar debe ser ${roles}` });

        }

        next();
    }

};

module.exports = { esAdminRole, roleDelete };