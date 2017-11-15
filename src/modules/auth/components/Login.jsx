// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {
  +login: (username: string, password: string) => {},
  +loginTest: Function,
  +isAuth: boolean,
  +authenticated: boolean,
  +user?: any,
  +onChange?: Function,
  +onSave?: Function,
  +onGetData?: Function
}

type State = {
  +usernameInput: {
    value: ''
  },
  +passwordInput: {
    value: ''
  }
}

export default class Login extends React.Component<Props, State> {
  state = {
    usernameInput: {
      value: '',
    },
    passwordInput: {
      value: '',
    }
  };

  onSubmit(event: Event) {
    event.preventDefault();
    const {usernameInput, passwordInput} = this.state;
    this.props.login(usernameInput.value, passwordInput.value);
  }

  onChange(event: SyntheticEvent<HTMLInputElement>) {
    const key = `${event.currentTarget.name}Input`;
    this.setState({
      [key]: {
        value: event.currentTarget.value,
      }
    });
  }

  onGetData(event: Event) {
    event.preventDefault();
    this.props.loginTest();
  }

  render() {
    const {isAuth, authenticated, data} = this.props;
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)}>
          <input
            name="username"
            onChange={event => this.onChange(event)}/>
          <br/>
          <input
            name="password"
            onChange={event => this.onChange(event)}/>
          <br/>
          <button
            type="submit"
            disabled={isAuth}
            onClick={event => this.onSubmit(event)}>
            Log In
          </button>
          <br/>
          <br/>
          {authenticated && <button
            type="submit"
            onClick={event => this.onGetData(event)}>
            Get data
          </button>}
          {data &&
          <ul>
            {data.map((num, i) => <li key={i}>{num}</li>)}
          </ul>}
        </form>
      </div>
    )
  }
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loginTest: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  authenticated: PropTypes.bool,
  user: PropTypes.object,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onGetData: PropTypes.func,
};