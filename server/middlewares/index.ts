import { AuthInfoMiddleware } from './authMiddleware'
import { QueryInfoMiddleware } from './queryMiddleware'
import { BlockMiddleware } from './blockMiddleware'
import { CheckInMiddleware } from './checkinMiddleware'


const authInfoMiddleware = new AuthInfoMiddleware()
const queryInfoMiddleware = new QueryInfoMiddleware()
const blockMiddleware = new BlockMiddleware()

const checkinMiddleware = new CheckInMiddleware()


export {
    authInfoMiddleware,
    queryInfoMiddleware,
    blockMiddleware,

    checkinMiddleware

}