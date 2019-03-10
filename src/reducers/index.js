import { combineReducers } from "redux";
import * as guid from "guid";
import * as _ from "lodash";


import books from './book'

const store = combineReducers({
    books
})

export default store