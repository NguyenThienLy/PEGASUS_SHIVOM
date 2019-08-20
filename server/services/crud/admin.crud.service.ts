import { CrudService } from '../crud.service'
import { Admin, AdminModel } from '../../models/index.model'

export class AdminService extends CrudService<typeof Admin> {
    constructor(){
        super(Admin);
    }
}