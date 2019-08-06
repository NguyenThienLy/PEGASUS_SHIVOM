import { CrudController } from '../crudController'
import { packageService } from '../../services/index'


export class PackageController extends CrudController<typeof packageService>{
    constructor(){
        super(packageService);
    }
    
}