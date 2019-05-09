import { CrudApi } from '../crud'

export class BookApi extends CrudApi {
    constructor(){
        super("book")
    }
}