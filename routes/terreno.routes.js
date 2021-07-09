const express = require('express');
let router = express.Router();
const TerrenoController = require('../controllers/terreno.controller');
const {
    body,
    param
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, TerrenoController.get)
    .post(AuthController.checkAuth, [
        body('name').isString(),
        body('cultura').isString(),
        body('descricao').isString(),
        body('area').isInt(),
        body('urlPhoto').isAlpha(),
        //body('urlPhoto').isURL(),
        body('descricao').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], TerrenoController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], TerrenoController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], TerrenoController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], TerrenoController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], TerrenoController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], TerrenoController.delete);

module.exports = router;