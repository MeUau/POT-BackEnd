module.exports = {
    mongodb: {
        uri: 'mongodb+srv://admin2021:admin2021@POT.xhnws.mongodb.net/POT?retryWrites=true&w=majority',
        collections: {
            user: 'users',
            terreno: 'terrenos',
            contrato: 'contratos',
            clausula: 'clausulas'
        }
    },
    auth: {
        expiration_time: 15000,
        issuer: "admin2021"
    },
    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
        numerical: "0123456789"
    },
    email: {
        service: "Gmail",
        auth: {
            user: "mailserverpw@gmail.com",
            pass: "ttxirdxzkafhcuel"
        }
    }
}