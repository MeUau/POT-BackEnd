module.exports = {
    success: {
        s0: {
            code: "TerrenoCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "TerrenoUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "TerrenoFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "TerrenoDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoTerrenos",
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
            code: "TerrenoNotFound",
            type: "error"
        }
    }
}