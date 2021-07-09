module.exports = {
    success: {
        s0: {
            code: "ContratoCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "ContratoUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "ContratoFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "ContratoDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoContratos",
            type: "success"
        },
        s6: {
            http: 200,
            code: "Activated",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "ContratoNotFound",
            type: "error"
        }
    }
}