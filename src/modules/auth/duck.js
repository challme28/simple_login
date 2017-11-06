// @flow
import Rx from 'rxjs';
// Actions
const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTH_SUCCESS';

type actionType = {
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
export function login(username: string, password: string): actionType {
  return {
    type: AUTH_REQUEST,
    username,
    password
  };
}

export function loginSuccess(user: any): actionType {
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
export default function authReducer(state: authStateType = {}, action: actionType): authStateType {
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
export function authEpic(action$: any) {
  return action$.ofType(AUTH_REQUEST)
    .mergeMap(() =>
      Rx.Observable.of({id: '123456', name: 'Llanos'})
        .delay(2000)
        .map(user => loginSuccess(user))
    );
}