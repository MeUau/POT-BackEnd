const express = require('express');
let router = express.Router();
const clausulaController = require('../controllers/clausula.controller');
const {
    body,
    param
} = require('express-validator');
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, clausulaController.get)
    .post(AuthController.checkAuth, [
        body('clausula').isString(),
        body('descricao').isString()
    ], clausulaController.create)

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], clausulaController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], clausulaController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], clausulaController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], clausulaController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], clausulaController.delete);

module.exports = router;