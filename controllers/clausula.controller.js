const clausula = require('../models/clausula.model');
const {
    validationResult
} = require('express-validator');
const clausulaMessages = require("../messages/clausula.messages");
const Contrato = require("../models/contrato.model");

exports.get = (req, res) => {
    clausula.find(req.query, (error, clausulas) => {
        if (error) throw error;
        let message = clausulaMessages.success.s2;

        if (clausulas.length < 0)
            message = clausulaMessages.success.s5;

        message.body = clausulas;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Clausula({
        clausula: req.body.clausula,
        descricao: req.body.descricao
    }).save((error, clausula) => {
        if (error) throw error;
        let message = clausulaMessages.success.s0;
        message.body = clausula;
        return res.header("location", "/clausulas/" + clausula._id).status(message.http).send(message);
    });

}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    clausula.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, clausula) => {
        if (error) throw error;
        if (!clausula) return res.status(clausulaMessages.error.e0.http).send(clausulaMessages.error.e0);

        let message = clausulaMessages.success.s1;
        message.body = clausula;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    clausula.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(clausulaMessages.error.e0.http).send(clausulaMessages.error.e0);

        Contrato.updateMany({}, {
            $pull: {
                clausulas: req.params.id
            }
        }, (error) => {
            if (error) throw error;
            return res.status(clausulaMessages.success.s3.http).send(clausulaMessages.success.s3);
        });
    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    clausula.findOne({
        _id: req.params.id
    }, (error, clausula) => {
        if (error) throw error;
        if (!clausula) return res.status(clausulaMessages.error.e0.http).send(clausulaMessages.error.e0);
        let message = clausulaMessages.success.s2;
        message.body = clausula;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    clausula.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(clausulaMessages.error.e0.http).send(clausulaMessages.error.e0);
        return res.status(clausulaMessages.success.s6.http).send(clausulaMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    clausula.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(clausulaMessages.error.e0.http).send(clausulaMessages.error.e0);
        return res.status(clausulaMessages.success.s4.http).send(clausulaMessages.success.s4);

    });
}