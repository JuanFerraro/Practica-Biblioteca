/* const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('DB esta conectada'))
    .catch(err => console.error(err)); */

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://JuanBarrios:Juan14Barrios14@mongodb1.dz8ee6z.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
})
    .then(db => console.log('DB esta conectada'));


