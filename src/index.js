const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
let exphbs = require('express-handlebars');

//Initiliazations
const app = express()

//Setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'Partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUnitialized: true
}))

//Global Variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files

//Server is listenning
app.listen(app.get('port'), () => {
    console.log("SERVER ON PORT", app.get('port'));
});