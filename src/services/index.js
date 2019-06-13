import { CrudApi } from './crud'
import { BookApi } from './reviewApi/book';
import { BookCategoryApi } from './reviewApi/bookCategory';
import { UserApi } from './reviewApi/user';
import { PostApi } from './reviewApi/post';
import { SearchApi } from './reviewApi/search'
import { BookAuthorApi } from './reviewApi/bookAuthor';
import { UserFollowApi } from './reviewApi/userFollow';
import { UserSavedApi } from './reviewApi/userSaved';
import { BookQuoteApi } from './reviewApi/bookQuote';
import { BookRateApi } from './reviewApi/bookRate';
import { PostReactionApi } from './reviewApi/postReaction';

const crudApi = new CrudApi()
 
class api {
    constructor(){

    }
    static book = new BookApi()
    static bookCategory = new BookCategoryApi()
    static user = new UserApi()
    static post = new PostApi()
    static search = new SearchApi()
    static bookAuthor = new BookAuthorApi()
    static userFollow = new UserFollowApi()
    static userSaved = new UserSavedApi()
    static bookQuote = new BookQuoteApi()
    static bookRate = new BookRateApi()
    static postReaction = new PostReactionApi()
}

export {
    crudApi,
    api
}