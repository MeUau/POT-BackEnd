const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const contratoSchema = new Schema({
    name: String,
    clausulas: [{
        type: String,
        ref: CONFIG.mongodb.collections.clausula
    }],
    active: {type: Boolean,default: true}
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.contrato, contratoSchema);