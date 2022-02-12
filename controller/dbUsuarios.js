const Usuario = require('../model/usuario.js');
const bcryptjs = require('bcryptjs');
const { body } = require('express-validator');
const { request } = require('express');


exports.usuarioGet = async (req, res) => {

    const query = { estado: true }

    const { limite = 100, desde = 0 } = req.query;
    /*     const usuarios = await Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite));
    */

    //    const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))]);

    res.json({
        total,
        usuarios
    })
};

exports.usuarioPost = async (req, res) => {

    //    const { id, name, surname, email, password, role } = req.body;
    //  const usuario = new Usuario({ id, name, surname, email, password, role });
    //const { id, name, surname, email, password, role } = req.body;
    const usuario = new Usuario(req.body);

    const password = req.body.password;
    const salt = bcryptjs.genSaltSync(10);
    //    usuario.password = bcryptjs.hashSync(password, salt);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'post API - Usuario',
        usuario
    })

};

exports.usuarioPut = async (req, res) => {

    const id = req.params.id;
    const { password, google, email, ...resto } = req.body

    //    console.log(`Body :${req.body.id} y params${req.params.id}`);

    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuarioDB
    })
};

exports.usuarioDelete = async (req, res) => {
    //Borrado fisico
    //const usuario = await Usuario.findByIdAndDelete(id);

    //  console.log(`Body :${req.body.id} y params${req.params.id}`);

    const id = req.params.id;
    console.log('id: ' + id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    // const usuarioAutenticado = req.usuario;


    res.json({
        msg: 'delete API - Usuario',
        usuario
    })

};