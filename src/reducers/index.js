import { combineReducers } from "redux";

import user from './user'
import { CategoryReducer } from './category'
import { ReviewerReducer } from './reviewer'
import { UserFollowReducer } from './userFollow'
import { UserSavedReducer } from './userSaved'
import { AuthorReducer } from './author'
import { PostReducer } from './post'
import { BookReducer } from './book'
import { BookQuoteReducer } from './bookQuote'

const postReducer = new PostReducer()
const bookReducer = new BookReducer()
const bookQuoteReducer = new BookQuoteReducer()
const authorReducer = new AuthorReducer()
const categoryReducer = new CategoryReducer()
const reviewerReducer = new ReviewerReducer()
const userFollowReducer = new UserFollowReducer()
const userSavedReducer = new UserSavedReducer()

const store = combineReducers({
    books: bookReducer.reducer,
    user,
    categories: categoryReducer.reducer,
    posts: postReducer.reducer,
    reviewers: reviewerReducer.reducer,
    userFollows: userFollowReducer.reducer,
    userSaveds: userSavedReducer.reducer,
    authors: authorReducer.reducer,
    bookQuotes: bookQuoteReducer.reducer
})

export default store