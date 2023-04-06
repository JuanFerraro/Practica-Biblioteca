const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
/* Para validar autenticidad del usuario */
const { isAuthenticated } = require('../helpers/auth');
const { ensureAuthenticated } = require('../helpers/authEnsure');
const { encryptPassword, matchPassword } = require('../helpers/bcryptUtil');

/* SIGNIN & SIGNUP */

/* Vista del sign-in */
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

/* Si ingresa con credenciales correctas */
/* router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/libros',
    failureRedirect: '/users/signin',
    failureFlash: true
})); */

/* PRUEBA **************************************************************************************/
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

router.get('/view-empleado',  (req, res) => {
    res.render('users/view-empleado', { user: req.user });
});

/* FIN PRUEBA **********************************************************************************/

/* Vista del sign-up */
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

/* Recibe datos de SIGNUP */
router.post('/users/signup', async (req, res) => {
    const { nombre, email, password, confirmarPassword, tipo } = req.body;
    const errors = [];
    if (password != confirmarPassword) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.lentgh < 4) {
        error.push({ text: 'El password debe ser de almenos 4 caracteres.' })
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, nombre, email, password, confirmarPassword })
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            /* Mensaje de error */
            errors.push({ text: 'El emali ya tiene una cuenta' })
            res.render('users/signup', { errors, nombre, email, password, confirmarPassword })
        } else {
            const newUser = new User({ nombre, email, password, tipo });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            /* Mensaje de está registrado*/
            req.flash('succes_msg', 'Estas registrado');
            res.redirect('/users/signin');
        }
    }
});

/* LogOut termina la sesion */
router.get('/users/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

/* *************************************************************************************************** */
/* *************************************************************************************************** */
/* *************************************************************************************************** */
/* CRUD DE USUARIOS */

/* Mostrar añadir un nuevo libro */
router.get('/users/add', isAuthenticated, (req, res) => {
    res.render('users/new-user');
});

//* Añadir un nuevo Usuario */
router.post('/users/new-user', isAuthenticated, async (req, res) => {
    const { nombre, email, password, confirmarPassword, tipo } = req.body;
    const emailUser = await User.findOne({ email: email });
    /* Validaciones */
    const errors = [];
    if (password != confirmarPassword) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.lentgh < 4) {
        error.push({ text: 'El password debe ser de almenos 4 caracteres.' })
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, nombre, email, password, confirmarPassword })
    }
    if (emailUser) {
        /* Mensaje de error */
        errors.push({ text: 'El emal ya tiene una cuenta' })
        res.render('users/new-user', { errors, nombre, email, password, confirmarPassword })
    } else {
        const newUser = new User({ nombre, email, password, tipo });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        /* Mensaje de está registrado*/
        req.flash('succes_msg', 'Estas registrado');
        res.redirect('/users');
    }
});

/* Redireccion del boton Añadir */
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.render('users/all-user', { users });
});

/* Redireccion del boton Añadir otro Usuario */
router.get('/users/new-user', isAuthenticated, (req, res) => {
    res.render('users/new-user');
});

/* Edicion de Usuario */
router.get('/users/edit/:id', isAuthenticated, async (req, res) => {
    const user = await User.findById(req.params.id)
    res.render('users/edit-user', { user })
});

/* Envio de edicion de Usuario */
router.put('/users/edit-user/:id', isAuthenticated, async (req, res) => {
    const { nombre, email, password, confirmarPassword, tipo } = req.body;
    /* Validaciones */
    const errors = [];
    if (password != confirmarPassword) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.lentgh < 4) {
        error.push({ text: 'El password debe ser de almenos 4 caracteres.' })
    }
    if (errors.length > 0) {
        res.render('users/edit-user', { errors, nombre, email, password, confirmarPassword, tipo })
    } else {
        try {
            const user = await User.findById(req.params.id);
            const encryptedPassword = await user.encryptPassword(password);
            user.nombre = nombre;
            user.email = email;
            user.password = encryptedPassword;
            user.tipo = tipo;
            await user.save();
            req.flash('success_msg', 'Usuario actualizado.');
            res.redirect('/users');
        } catch (err) {
            console.log(err);
            req.flash('error_msg', 'Ha ocurrido un error al actualizar el usuario.');
            res.redirect('/users');
        }
    }
});

/* Eliminación de Usuario */
router.delete('/users/delete/:id', isAuthenticated, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
})

module.exports = router;