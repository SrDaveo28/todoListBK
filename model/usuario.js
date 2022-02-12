const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'El id es obligatorio']
    },
    name: { type: String },
    surname: { type: String },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        unique: true,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'TECH_ROLE', 'PLANNING_ROLE'],
    },
    img: { type: String },
    google: { type: Boolean, default: false },
    estado: { type: Boolean, default: true },
    coneccion: {
        connection_status: { type: Boolean },
        room: { type: String },
        socket_id: { type: String }
    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id;

    return usuario;
}
module.exports = Usuario = mongoose.model('Usuario', UsuarioSchema);