import * as dotenv from 'dotenv'
dotenv.config({ silent: true })
export default {
    database: {
        //mongo: process.env.MONGOLOCAL_URI,
        mongo: process.env.MONGOLOCAL_URI,
        defaultPageSize: 50,
    },
    token: {
        secret: process.env.TOKEN_SECRET
    }

}