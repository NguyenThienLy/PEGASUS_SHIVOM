import * as dotenv from 'dotenv'
dotenv.config({ silent: true })
export default {
    server: {
        host: 'localhost',
        protocol: 'http',
        debug: false,
        port: process.env.PORT || 3000,
        uiHost: 'http://localhost:300',
        version: 'v1',
    },
    database: {
        mongo: process.env.MONGOLAB_URI,
        //mongo: process.env.MONGOLOCAL_URI,
        defaultPageSize: 50
    },
    token: {
        secret: process.env.TOKEN_SECRET
    },

}