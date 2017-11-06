import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import authReducer, { authEpic } from './auth/duck';
import { routerReducer } from 'react-router-redux';

export const rootEpic = combineEpics(
  authEpic
);

export const rootReducer = combineReducers({
  authReducer,
  routing: routerReducer
});