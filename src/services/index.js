import { CrudApi } from './crud'
import { BookApi } from './reviewApi/book';
import { BookCategoryApi } from './reviewApi/bookCategory';
import { UserApi } from './reviewApi/user';
import { PostApi } from './reviewApi/post';
import { SearchApi } from './reviewApi/search'

const crudApi = new CrudApi()
 
class api {
    constructor(){

    }
    static book = new BookApi()
    static bookCategory = new BookCategoryApi()
    static user = new UserApi()
    static post = new PostApi()
    static search = new SearchApi()
}

export {
    crudApi,
    api
}