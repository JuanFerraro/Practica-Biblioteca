const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://User:user@mongodb1.dz8ee6z.mongodb.net/biblioteca_municipal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log('DB esta conectada'))
    .catch(err => console.error(err));


