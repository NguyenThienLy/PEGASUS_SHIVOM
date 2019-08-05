
import { CrudService, ICrudExecOption, ICrudOption } from './crudService'
import { UtilService} from './utilService'
import { ErrorService } from './errorService'
import { TokenService } from './tokenService'

import { BlogService } from './crud/blogService'


const utilService = new UtilService()
const errorService = new ErrorService()
const tokenService = new TokenService()

const blogService = new BlogService()

export {
    CrudService, ICrudExecOption, ICrudOption,
    utilService,
    errorService,
    tokenService,

    blogService
}