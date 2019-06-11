import { combineReducers } from "redux";
import * as guid from "guid";
import * as _ from "lodash";


import books from './book'
import user from './user'
import categories from './category'
import posts from './post'
import reviewers from './reviewer'
import userFollows from './userFollow'
import userSaveds from './userSaved'
import authors from './author'
import bookQuotes from './bookQuote'

const store = combineReducers({
    books,
    user,
    categories,
    posts,
    reviewers,
    userFollows,
    userSaveds,
    authors,
    bookQuotes
})

export default store