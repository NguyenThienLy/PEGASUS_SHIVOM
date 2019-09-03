import { CrudApi } from '../crud'

export class NewsApi extends CrudApi {
    constructor() {
        super("news")
    }
}