import { CrudApi } from '../crud'

export class BookQuoteApi extends CrudApi {
    constructor(){
        super("bookQuote")
    }
}