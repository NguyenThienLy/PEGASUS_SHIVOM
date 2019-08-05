import { combineReducers } from "redux";

import { PostReducer } from './post'

const postReducer = new PostReducer()

const store = combineReducers({
    post: postReducer.reducer
})

export default store