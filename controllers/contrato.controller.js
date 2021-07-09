const Contrato = require('../models/contrato.model');
const {
    validationResult
} = require('express-validator');
const ContratoMessages = require("../messages/contrato.messages");

exports.get = (req, res) => {

    Contrato.find(req.query).populate("clausulas").exec((error, contratos) => {
        if (error) throw error;
        let message = ContratoMessages.success.s2;

        if (contratos.length < 0)
            message = ContratoMessages.success.s5;

        message.body = contratos;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Contrato({
        name: req.body.name,
        clausulas: req.body.clausulas
    }).save((error, contrato) => {
        if (error) throw error;
        contrato.populate("clausulas", (error) => {
            if (error) throw error;
            let message = ContratoMessages.success.s0;
            message.body = contrato;
            return res.header("location", "/contratos/" + contrato._id).status(message.http).send(message);
        });

    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Contrato.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, contrato) => {
        if (error) throw error;
        if (!contrato) return res.status(ContratoMessages.error.e0.http).send(ContratoMessages.error.e0);
        contrato.populate("clausulas", (error) => {
            if (error) throw error;
            let message = ContratoMessages.success.s1;
            message.body = contrato;
            return res.status(message.http).send(message);
        });
    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Contrato.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(ContratoMessages.error.e0.http).send(ContratoMessages.error.e0);
        return res.status(ContratoMessages.success.s3.http).send(ContratoMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Contrato.findOne({
        _id: req.params.id
    }).populate("clausulas").exec((error, contrato) => {
        if (error) throw error;
        if (!contrato) return res.status(ContratoMessages.error.e0.http).send(ContratoMessages.error.e0);
        let message = ContratoMessages.success.s2;
        message.body = contrato;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Contrato.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(ContratoMessages.error.e0.http).send(ContratoMessages.error.e0);
        return res.status(ContratoMessages.success.s6.http).send(ContratoMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Contrato.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(ContratoMessages.error.e0.http).send(ContratoMessages.error.e0);
        return res.status(ContratoMessages.success.s4.http).send(ContratoMessages.success.s4);

    });
}