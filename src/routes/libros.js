const express = require('express');
const router = express.Router();
const Libro = require('../models/Libros');
const Autor = require('../models/Autor');
/* Para validar autenticidad del usuario */
const { isAuthenticated } = require('../helpers/auth');

/* Mostrar añadir un nuevo libro */
router.get('/libros/add', isAuthenticated, (req, res) => {
    res.render('libros/new-libro');
});

//* Añadir un nuevo libro */
router.post('/libros/new-libro', isAuthenticated, async (req, res) => {
    const { titulo, ISBN, editorial, genero, añoPublicacion, autor } = req.body;
    /* Validaciones */
    const errors = [];
    const newLibro = new Libro({ titulo, ISBN, editorial, genero, añoPublicacion, autor });
    const ISBNLibro = await Libro.findOne({ ISBN: ISBN });
    const autorLibro = await Autor.findOne({ nombre: autor });
    if (ISBNLibro) {
        /* Mensaje de error */
        errors.push({ text: 'Ya existe un libro identificado con este ISBN.' })
        res.render('libros/new-libro', { errors, titulo, ISBN, editorial, genero, añoPublicacion, autor })
    }
    if (autorLibro === null) {
        /* Mensaje de error */
        errors.push({ text: 'Aun no existe este autor, por favor ingresalo.' })
        res.render('autores/new-autor', { errors })
    } else {
        await newLibro.save();
        req.flash('success_msg', 'Libro agregado exitosamente.')
        res.redirect('/libros');
    }
});

/* Redireccion del boton Añadir */
router.get('/libros', async (req, res) => {
    const libros = await Libro.find().sort({ añoPublicacion: 'desc' });
    res.render('libros/all-libros', { libros });
});

/* Redireccion del boton Añadir otro libro */
router.get('/libros/new-libro', isAuthenticated, (req, res) => {
    res.render('libros/new-libro');
});

/* Edicion de libro */
router.get('/libros/edit/:id', isAuthenticated, async (req, res) => {
    const libro = await Libro.findById(req.params.id)
    res.render('libros/edit-libro', { libro })
});

/* Envio de edicion de libro */
router.put('/libros/edit-libro/:id', isAuthenticated, async (req, res) => {
    const { titulo, ISBN, editorial, genero, añoPublicacion, autor } = req.body;
    await Libro.findByIdAndUpdate(req.params.id, { titulo, ISBN, editorial, genero, añoPublicacion, autor });
    req.flash('success_msg', 'Libro actualizado.');
    res.redirect('/libros');
});

/* Eliminación de libro */
router.delete('/libros/delete/:id', isAuthenticated, async (req, res) => {
    await Libro.findByIdAndDelete(req.params.id);
    res.redirect('/libros');
})

module.exports = router;