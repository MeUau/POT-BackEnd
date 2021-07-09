const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const clausulaSchema = new Schema({
    clausula: String,
    descricao: String,
    active: {type: Boolean,default: true}
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.clausula, clausulaSchema);