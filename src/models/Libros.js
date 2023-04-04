const mongoose = require('mongoose');
const { Schema } = mongoose;

const LibroSchema = new Schema({
    titulo: {type: String, required: true},
    ISBN: {type: String, required: true},
    editorial: {type: String, required: true},
    genero: {type: String, required: true},
    añoPublicacion: {type: String, required: true},
    autor: {type: String, required: true},
});

module.exports = mongoose.model('Libro', LibroSchema)