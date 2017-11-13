// @flow
import Rx from 'rxjs';
import { ActionsObservable } from "redux-observable";
// Actions
const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTH_SUCCESS';

type authActions = {
  +type: string,
  +user?: any,
  +username?: string,
  +password?: string
};

export type authStateType = {
  +isAuth?: boolean,
  +user?: any
};

// Action Creators
export function login(username: string, password: string): authActions {
  return {
    type: AUTH_REQUEST,
    username,
    password
  };
}

export function loginSuccess(user: any): authActions {
  return {
    type: AUTH_SUCCESS,
    user
  };
}

export const actions = {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  login,
  loginSuccess,
};


// Reducer
export default function reducer(state: authStateType = {}, action: authActions): authStateType {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        isAuth: true
      };
    case AUTH_SUCCESS:
      return {
        user: action.user
      };
    default:
      return state;
  }
}

// EPIC
export function authEpic(action$: ActionsObservable<authActions>) {
  return action$.ofType(AUTH_REQUEST)
      .mergeMap((action: authActions) =>
        Rx.Observable.of({id: '123456', name: 'Llanos', username: action.username, password: action.password})
          .delay(2000)
          .map(user => loginSuccess(user))
    );
}