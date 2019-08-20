import { CrudService } from '../crud.service'
import { Package, PackageModel } from '../../models/index.model'

export class PackageService extends CrudService<typeof Package> {
    constructor(){
        super(Package);
    }
}