import { createStore, compose, applyMiddleware, combineReducers } from 'redux'

import TodoReducer from './todos/reducer'
import AuthReducer from './auth/reducer'

import logger from 'redux-logger'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  todoStore: TodoReducer,
  authStore: AuthReducer
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
)
