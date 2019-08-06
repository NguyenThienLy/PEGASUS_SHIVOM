import { CrudController } from '../crudController'
import { contactService } from '../../services/index'


export class ContactController extends CrudController<typeof contactService>{
    constructor(){
        super(contactService);
    }
    
}