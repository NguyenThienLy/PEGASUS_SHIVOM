import { CrudApi } from '../crud'

export class BookAuthorApi extends CrudApi {
    constructor(){
        super("bookAuthor")
    }
}