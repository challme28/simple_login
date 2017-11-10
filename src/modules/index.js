import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import authReducer, { authEpic } from './auth/duck';
import postsReducer, { selectedSubreddit, postsEpic } from "./posts/duck";

export const rootEpic = combineEpics(
  authEpic,
  postsEpic
);

export const rootReducer = combineReducers({
  authReducer,
  postsReducer,
  selectedSubreddit,
  routing: routerReducer
});