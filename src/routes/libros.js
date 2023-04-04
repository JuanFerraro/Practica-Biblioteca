const express = require('express');
const router = express.Router();

const Libro = require('../models/Libros');

router.get('/libros/add', (req,res) =>{
    res.render('libros/new-libro');
});

//* Añadir un nuevo libro */
router.post('/libros/new-libro', async (req, res) => {
    const {titulo, ISBN, editorial, genero, añoPublicacion, autor} = req.body;
    const newLibro = new Libro({titulo, ISBN, editorial, genero, añoPublicacion, autor});
    await newLibro.save();
    req.flash('success_msg', 'Libro agregado exitosamente.')
    res.redirect('/libros');
});

/* Redireccion del boton Añadir */
router.get('/libros', async (req, res) => {
    const libros = await Libro.find().sort({añoPublicacion: 'desc'});
    res.render('libros/all-libros', { libros });
});

/* Redireccion del boton Añadir otro libro */
router.get('/libros/new-libro',  (req, res) => {
    res.render('libros/new-libro');
});

/* Edicion de libro */
router.get('/libros/edit/:id', async (req, res) => {
    const libro = await Libro.findById(req.params.id)
    res.render('libros/edit-libro', {libro})
});

/* Envio de edicion de libro */
router.put('/libros/edit-libro/:id', async (req,res) => {
    const {titulo, ISBN, editorial, genero, añoPublicacion, autor} = req.body;
    await Libro.findByIdAndUpdate(req.params.id, {titulo, ISBN, editorial, genero, añoPublicacion, autor});
    res.redirect('/libros');
});

/* Eliminación de libro */
router.delete('/libros/delete/:id', async (req,res) => {
    await Libro.findByIdAndDelete(req.params.id);
    res.redirect('/libros');
})

module.exports = router;