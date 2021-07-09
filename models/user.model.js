const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');
const bcrypt = require("bcryptjs");

// USER MODEL TESTADO COM thunder
const userSchema = new Schema({
    name: String,
    auth: {
        username: {type: String,unique: true},
        password: String,
        public_key: String,
        private_key: String
    },
    type: {type: String,default:  "user"},
    registration_date: {type: Date,default: Date.now},
    active: {type: Boolean,default: true},
    descricao: {type: String,default: null},
    location: {
        freguesia: {type: String,default: null},
        concelho: {type: String,default: null},
        distrito: {type: String,default: null}
    },
    level: {
        area: {type: Number,default: 0}
    }
});

userSchema
    .pre("save", function (callback) {

        this.auth.public_key = Math.random().toString(36).substring(2) + this._id;
        this.auth.private_key = Math.random().toString(36).substring(2) + this._id;

        this.auth.password = bcrypt.hashSync(escape(this.auth.password), bcrypt.genSaltSync(2));

        callback();
    })


module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.user, userSchema);