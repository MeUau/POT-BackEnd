const Terreno = require('../models/terreno.model');
const {
    validationResult
} = require('express-validator');
const TerrenoMessages = require("../messages/terreno.messages");

exports.get = (req, res) => {

    Terreno.find(req.query).populate("comments.user", "name").exec((error, terrenos) => {
        if (error) throw error;

        let message = TerrenoMessages.success.s2;

        if (terrenos.length < 0)
            message = TerrenoMessages.success.s5;

        message.body = terrenos;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);
    
    new Terreno({
        name: req.body.name,
        area: req.body.area,
        cultura: req.body.cultura,
        descricao: req.body.descricao,
        urlPhoto: req.body.urlPhoto
    }).save((error, terreno) => {
        if (error) throw error;
        let message = TerrenoMessages.success.s0;
        message.body = terreno;
        return res.header("location", "/terrenos/" + terreno._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Terreno.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, terreno) => {
        if (error) throw error;
        if (!terreno) return res.status(TerrenoMessages.error.e0.http).send(TerrenoMessages.error.e0);

        let message = TerrenoMessages.success.s1;
        message.body = terreno;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Terreno.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(TerrenoMessages.error.e0.http).send(TerrenoMessages.error.e0);
        return res.status(TerrenoMessages.success.s3.http).send(TerrenoMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Terreno.findOne({
        _id: req.params.id
    }).populate("comments.user", "name").exec((error, terreno) => {
        if (error) throw error;
        if (!terreno) return res.status(TerrenoMessages.error.e0.http).send(TerrenoMessages.error.e0);
        let message = TerrenoMessages.success.s2;
        message.body = terreno;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Terreno.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(TerrenoMessages.error.e0.http).send(TerrenoMessages.error.e0);
        return res.status(TerrenoMessages.success.s6.http).send(TerrenoMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Terreno.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(TerrenoMessages.error.e0.http).send(TerrenoMessages.error.e0);
        return res.status(TerrenoMessages.success.s4.http).send(TerrenoMessages.success.s4);

    });
}