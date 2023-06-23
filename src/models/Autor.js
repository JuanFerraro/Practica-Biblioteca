const mongoose = require('mongoose');
const { Schema } = mongoose;

const AutorSchema = new Schema({
    nombre: {type: String, required: true},
    identificacion: {type: Number, required: true},
    nacionalidad: {type: String, required: true},
});

/* Para poder utilizarlo: */
module.exports = mongoose.model('Autor', AutorSchema)