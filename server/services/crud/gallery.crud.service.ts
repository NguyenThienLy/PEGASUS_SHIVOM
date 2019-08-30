import { CrudService } from '../crud.service'
import { Gallery, GalleryModel } from '../../models'

export class GalleryService extends CrudService <typeof Gallery > {
    constructor() {
        super(Gallery);
    }
}