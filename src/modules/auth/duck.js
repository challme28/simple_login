// @flow
import Rx from 'rxjs';
import {ActionsObservable} from "redux-observable";
// Actions
const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_TEST = 'AUTH_TEST';
const AUTH_DATA = 'AUTH_DATA';

type authActions = {
  +type: string,
  +user?: any,
  +username?: string,
  +password?: string,
  +data?: Array<number>
};

export type authStateType = {
  +isAuth?: boolean,
  +authenticated?: boolean,
  +user?: any,
  +data?: Array<number>
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

export function loginTest(): authActions {
  return {
    type: AUTH_TEST,
  };
}

export function loginData(data: Array<number>): authActions {
  return {
    type: AUTH_DATA,
    data
  };
}

export const actions = {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_TEST,
  AUTH_DATA,
  login,
  loginSuccess,
  loginTest,
  loginData,
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
        user: action.user,
        authenticated: true
      };
    case AUTH_DATA:
      return {
        authenticated: true,
        data: action.data
      };
    default:
      return state;
  }
}

// Epics
export function authEpic(action$: ActionsObservable<authActions>) {
  return action$.ofType(AUTH_REQUEST)
    .mergeMap((action: authActions) => {
        const {username, password} = action;
        const opts = {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        };
        return Rx.Observable.fromPromise(fetch(`/api/auth/login`, opts)
          .then(response => response.json())
          .catch(console.log))
          .map(response => loginSuccess(response));
      }
    );
}

export function dataEpic(action$: ActionsObservable<authActions>) {
  return action$.ofType(AUTH_TEST)
    .mergeMap(() => {
      const opts = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      };
      return Rx.Observable.fromPromise(fetch(`/api/data/test`, opts)
        .then(response => response.json())
        .catch(console.log))
        .map(data => loginData(data));
    });
}