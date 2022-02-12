const Role = require('../model/role');
const Usuario = require('../model/usuario');

const esRolValido = async (role = '') => {

    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
        throw new Error(`El rol ${role} no existe en BD`);
    }

}

const existeEmail = async (email = '') => {

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo : ${email} YA esta registrado`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id} NO existe`);
    }
}


const prioridadValido = async (prioridad = '') => {

    const existePrioridad = await Role.findOne({ prioridad });

    if (!existePrioridad) {
        throw new Error(`Prioridad ${prioridad} no existe en BD`);
    }

}




module.exports = { esRolValido, existeEmail, existeUsuarioPorId, prioridadValido };
