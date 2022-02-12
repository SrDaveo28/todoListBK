const mongoose = require("mongoose")

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports = Role = mongoose.model('Role', RoleSchema);