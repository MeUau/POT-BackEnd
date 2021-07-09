const express = require('express');
let router = express.Router();
const ContratoController = require('../controllers/contrato.controller');
const {
    body,
    param
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, ContratoController.get)
    .post(AuthController.checkAuth, [
        body('name').isString(),
        body('clausulas.*').isMongoId()
    ], ContratoController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], ContratoController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], ContratoController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], ContratoController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], ContratoController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], ContratoController.delete);

module.exports = router;