const express = require('express');
const router = express.Router();
const Autor = require('../models/Autor');
const Libro = require('../models/Libros');
/* Para validar autenticidad del usuario */
const { isAuthenticated } = require('../helpers/auth');

/* Mostrar añadir nuevo autor */
router.get('/autores/add', isAuthenticated, (req, res) => {
    res.render('autores/new-autor');
});

/* Añadir nuevo autor */
router.post('/autores/new-autor', isAuthenticated, async (req, res) => {
    const { nombre, identificacion, nacionalidad } = req.body;
    /* Validaciones */
    const errors = [];
    const identificacionAutor = await Autor.findOne({ identificacion: identificacion });
    if (identificacionAutor) {
        /* Mensaje de error */
        errors.push({ text: 'Ya existe un autor con esa identificación.' })
        res.render('autores/new-autor', { errors, nombre, identificacion, nacionalidad })
    } else {
        const newAutor = new Autor({ nombre, identificacion, nacionalidad });
        await newAutor.save();
        req.flash('success_msg', 'Autor agregado exitosamente.')
        res.redirect('/autores');
    }
});

/* Redireccion del boton Añadir */
router.get('/autores', async (req, res) => {
    const autores = await Autor.find();
    res.render('autores/all-autores', { autores });
});

/* Redireccion del boton Añadir otro Autor */
router.get('/autores/new-autor', isAuthenticated, (req, res) => {
    res.render('autores/new-autor');
});

/* Edicion de autor */
router.get('/autores/edit/:id', isAuthenticated, async (req, res) => {
    const autor = await Autor.findById(req.params.id)
    res.render('autores/edit-autor', { autor })
});

/* Envio de edicion de autor */
router.put('/autores/edit-autor/:id', isAuthenticated, async (req, res) => {
    const { nombrePasado, nombre, identificacion, nacionalidad } = req.body;
    /* Validaciones */
    /* const nombreAutor = await Libro.findOne({ autor: nombrePasado }); */
    await Libro.updateMany({ autor: nombrePasado }, { $set: { autor: nombre } });
    await Autor.findByIdAndUpdate(req.params.id, { nombre, identificacion, nacionalidad });
    req.flash('success_msg', 'Autor actualizado.');
    res.redirect('/autores');

});

/* Eliminación de Autor */
router.delete('/autores/delete/:id', isAuthenticated, async (req, res) => {
    await Autor.findByIdAndDelete(req.params.id);
    res.redirect('/autores');
})

module.exports = router;