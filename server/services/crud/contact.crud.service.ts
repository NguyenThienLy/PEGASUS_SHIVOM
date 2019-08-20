import { CrudService } from '../crud.service'
import { Contact, ContactModel } from '../../models'

export class ContactService extends CrudService<typeof Contact> {
    constructor(){
        super(Contact);
    }
}