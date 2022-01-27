import { createStore, combineReducers, applyMiddleware } from 'redux';
import { contactsReducer } from './reducers';
import { createLogger } from 'redux-logger';

const middleware = applyMiddleware(createLogger({collapsed: true}))

export const store = createStore(contactsReducer, middleware);
console.log('initial state', store.getState())