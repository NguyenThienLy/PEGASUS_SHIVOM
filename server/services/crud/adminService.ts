import { CrudService } from '../crudService'
import { Admin, AdminModel } from '../../models'

export class AdminService extends CrudService<typeof Admin> {
    constructor(){
        super(Admin);
    }
}