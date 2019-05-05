import { CrudApi } from '../crud'

export class BookCategoryApi extends CrudApi {
    constructor(){
        super("bookCategory")
    }
}