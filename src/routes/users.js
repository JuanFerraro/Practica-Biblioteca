const express = require('express');
const router = express.Router();

const User = require('../models/User');

/* Vista del sign-in */
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

/* Vista del sign-up */
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

/* Recibe datos de SIGNUP */
router.post('/users/signup', async (req, res) => {
    const {nombre, email, password, confirmarPassword, tipo} = req.body;
    const errors = [];
    if(password != confirmarPassword){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(password.lentgh < 4){
        error.push({text: 'El password debe ser de almenos 4 caracteres.'})
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, nombre, email, password, confirmarPassword})
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            /* Mensaje de error */
            errors.push({text: 'El emali ya tiene una cuenta'})
            res.render('users/signup', {errors, nombre, email, password, confirmarPassword} )
        }else{
            const newUser = new User({nombre, email, password, tipo});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            /* Mensaje de está registrado*/
            req.flash('succes_msg', 'Estas registrado');
            res.redirect('/users/signin');
        }
    }
});


module.exports = router;