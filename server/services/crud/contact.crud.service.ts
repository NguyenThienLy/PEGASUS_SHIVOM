import { CrudService } from '../crud.service'
import { Contact, ContactModel } from '../../models/index.model'

export class ContactService extends CrudService<typeof Contact> {
    constructor(){
        super(Contact);
    }
}