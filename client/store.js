import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import appReducer from './reducers'

const logger = new createLogger()

const error = (store) => (next) => (action) => {
    try {
        next(action)
    } catch (err) {
        console.error("Redux error: ", err)
    }
}

const createAppStore = applyMiddleware(thunk, logger, error)(createStore)

export function configureStore(initialState) {
    return createAppStore(appReducer, initialState)
}



