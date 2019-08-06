import { CrudService } from '../crudService'
import { Contact, ContactModel } from '../../models'

export class ContactService extends CrudService<typeof Contact> {
    constructor(){
        super(Contact);
    }
}