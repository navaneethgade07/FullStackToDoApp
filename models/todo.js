const mongoose  = require('mongoose');

const createSchema = new mongoose.Schema({
    task : String,
    completed : Boolean,
});

module.exports = mongoose.model('Todos', createSchema);