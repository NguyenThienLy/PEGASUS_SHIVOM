import { CrudController } from '../crudController'
import { adminService, errorService } from '../../services/index'


export class AdminController extends CrudController<typeof adminService>{
    constructor() {
        super(adminService);
    }
    async login(params: {
        username: string
        password: string
    }) {
        const { username, password } = params
        const admin = await this.service.getItem({
            filter: {
                username: username
            }
        })
        const isMatch = await admin.comparePassword(password)
        if(!isMatch) throw errorService.auth.permissionDenied()
        return admin
    }
}