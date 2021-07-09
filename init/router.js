module.exports = (app) => {

    app.use('/', require("../routes/home.routes"));
    app.use('/terrenos', require('../routes/terreno.routes'));
    app.use('/auth', require('../routes/auth.routes'));
    app.use('/clausulas', require('../routes/clausula.routes'));
    app.use('/contratos', require('../routes/contrato.routes'));
    app.use('/users', require('../routes/user.routes'));
    app.use('/emails', require('../routes/email.routes'));
    
}

// Exemplo:
// $route
//     path:"/admin/terrenos/add"
//     query:Object (empty)
//     params:Object (empty)
//     fullPath:"/admin/terrenos/add"
//     name:"addTerreno"
//     meta:Object (empty)