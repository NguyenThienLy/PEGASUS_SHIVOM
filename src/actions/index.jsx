import { BaseAction } from './base'

import { UserAction } from './user'
import { BookAction } from './book';
import { PostAction } from './post';
import { UserSavedAction } from './userSaved';
import { UserFollowAction } from './userFollow';
import { CategoryAction } from './category'
import { ReviewerAction } from './reviewer'
import { AuthorAction } from './author'
import { BookQuoteAction } from './bookQuote';
class action {
    constructor() {
    }
    static user = new UserAction()
    static book = new BookAction()
    static category = new CategoryAction()
    static post = new PostAction()
    static reviewer = new ReviewerAction()
    static userSaved = new UserSavedAction()
    static userFollow = new UserFollowAction()
    static author = new AuthorAction()
    static bookQuote = new BookQuoteAction()
}

export {
    action
}
