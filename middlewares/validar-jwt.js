const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('X-Token');
    console.log('el token', token);

    if (!token) return res.status(401).json({
        message: 'No hay token'
    });

    try {


        // const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // console.log(payload);

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //const objetito = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //console.log('uid varios', objetito);


        //leer usuario
        const usuario = await Usuario.findOne({ id: uid });

        if (!usuario) return res.status(404).json({
            msg: 'Usuario no encontrado en BD'
        })


        //verificar si el usuario existe

        if (!usuario.estado) return res.status(401).json({

            msg: 'Usuario con estado: False'

        });


        req.usuario = usuario;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });

    };
};

module.exports = { validarJWT };