import { CrudController } from '../crud.controller'
import { galleryService } from '../../services/index'


export class GalleryController extends CrudController<typeof galleryService>{
    constructor(){
        super(galleryService);
    }
    
}