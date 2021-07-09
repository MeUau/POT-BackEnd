const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const terrenoSchema = new Schema({
    name: String,
    area: Number,
    cultura: {type: String,default: ""},
    descricao: {type: String,default: ""},
    urlPhoto: {type: String,default: ""},
    active: {type: Boolean,default: true},
    contrato: {
        type: String,
        ref: CONFIG.mongodb.collections.contrato
    },
    proprietario: {
        type: String,
        ref: CONFIG.mongodb.collections.user
    },
    parceiro: {
        type: String,
        ref: CONFIG.mongodb.collections.user
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.terreno, terrenoSchema);