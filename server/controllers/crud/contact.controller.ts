import { CrudController } from '../crud.controller'
import { contactService } from '../../services/index'


export class ContactController extends CrudController<typeof contactService>{
    constructor(){
        super(contactService);
    }
    
}