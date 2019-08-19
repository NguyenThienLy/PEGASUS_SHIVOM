import { CrudService } from '../crud.service'
import { Package, PackageModel } from '../../models'

export class PackageService extends CrudService<typeof Package> {
    constructor(){
        super(Package);
    }
}