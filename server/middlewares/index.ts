import { AuthInfoMiddleware } from './authMiddleware'
import { QueryInfoMiddleware } from './queryMiddleware'
import { BlockMiddleware } from './blockMiddleware'


const authInfoMiddleware = new AuthInfoMiddleware()
const queryInfoMiddleware = new QueryInfoMiddleware()
const blockMiddleware = new BlockMiddleware()


export {
    authInfoMiddleware,
    queryInfoMiddleware,
    blockMiddleware,

}