const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    ticket: {
        id: { type: Number },
        asignado_user: { type: String },
        asignado_por: { type: String },
        estado: {
            type: Boolean,
            enum: ['asignado', 'enProceso', 'realizado', 'noRealizado'],
            required: [true, `Debe indicar el estado de la tarea 'asignado', 'enProceso', 'realizado', 'noRealizado'`]
        }
    },
    referencia: { type: String },
    tarea: { type: String },
    prioridad: {
        type: String,
        enum: ['Alta', 'Media', 'Baja'],
        required: [true, `Definir prioridad: 'Alta', 'Media', 'Baja'`]
    },
    fecha: { type: Number },
    acciones: { type: String }
});

module.exports = Tarea = mongoose.model('Tarea', tareaSchema);