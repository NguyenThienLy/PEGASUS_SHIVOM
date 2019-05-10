import { combineReducers } from "redux";
import * as guid from "guid";
import * as _ from "lodash";


import books from './book'
import user from './user'

const store = combineReducers({
    books, user
})

export default store