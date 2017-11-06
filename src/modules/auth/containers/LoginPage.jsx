// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import { actions as AuthActions } from '../duck';

import type { authStateType } from '../duck';

function mapStateToProps(state: authStateType): authStateType {

  return {
    user: state.user,
    isAuth: state.isAuth
  }
}

function mapDispatchToProps(dispatch: Function): {} {
  return bindActionCreators(AuthActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);