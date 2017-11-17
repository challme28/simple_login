// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import { actions as AuthActions } from '../duck';

import type { authStateType } from '../duck';

type authReducer = {
  authReducer: authStateType;
}

function mapStateToProps(state: authReducer): authStateType {
  const { authReducer } = state;
  return {
    user: authReducer.user,
    isAuth: authReducer.isAuthing,
    authenticated: authReducer.authenticated,
    data: authReducer.data,
    errorMessage: authReducer.errorMessage,
  }
}

function mapDispatchToProps(dispatch: Function): {} {
  return bindActionCreators(AuthActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);