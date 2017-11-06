// @flow
import * as React from 'react';

type Props = {
  login: (username: string, password: string) => {},
  isAuth: boolean,
  user: any,
  onChange: Function,
  onSave: Function
}

type State = {
  usernameInput: {
    value: ''
  },
  passwordInput: {
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
    })
  }

  render() {
    const {isAuth} = this.props;
    return (
      <div>
        <form onSubmit={(event) => this.onSubmit(event)}>
          <input
            name="username"
            onChange={(event) => this.onChange(event)}/>
          <br/>
          <input
            name="password"
            onChange={(event) => this.onChange(event)}/>
          <br/>
          <button
            type="submit"
            disabled={isAuth}
            onClick={(event) => this.onSubmit(event)}>
            Log In
          </button>
        </form>
      </div>
    )
  }
};