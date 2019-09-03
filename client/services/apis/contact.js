import { CrudApi } from '../crud'

export class ContactApi extends CrudApi {
    constructor() {
        super("contact")
    }
}