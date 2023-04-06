function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        // Verificar el tipo de usuario
        if (req.user.tipo === 'Empleado') {
            return res.redirect('/view-empleado');
        } else if (req.user.tipo === 'Administrador') {
            return res.redirect('/libros');
        }
    }
    res.redirect('/users/signin');
}

module.exports = { ensureAuthenticated };