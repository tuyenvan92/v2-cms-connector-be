const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
    await mongoose.connect('mongodb+srv://nhattruongniit:truong123@cluster0.xga7w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
        .then(x => {
            console.log(
                `Connected to Mongo! Database name: "${x.connections[0].name}"`,
            );
        })
        .catch(err => {
            console.error('Error connecting to mongo', err);
        });
    return mongoose;
};