const bcrypt = require('bcryptjs/dist/bcrypt');
const generarJWT = require('../helpers/generar-jwt');
const Usuario = require('../model/usuario');

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        //verificar se o usuario existe
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ msg: 'Usuario/Password  no existe' });
        }

        //Verificar estado activo
        if (!usuario.estado) {
            return res.status(400).json({ msg: 'Usuario/Password No correcto estado false' });
        }

        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {

            return res.status(400).json({ msg: 'Usuario/Password No correcto Password' });

        }

        //Generar el token
        const token = await generarJWT(usuario.id);

        res.json({
            message: 'login JWT',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error salio mal" });
    }

};