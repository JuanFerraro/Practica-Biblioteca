const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    tipo: {type: String, require: true}
});

/* Metodo para descifrar contraseña */
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

/* Para poder utilizarlo: */
module.exports = mongoose.model('User', UserSchema)