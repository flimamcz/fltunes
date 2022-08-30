import React, { Component } from 'react';

class Login extends Component {
  state = {
    valueInput: '',
    disabled: true,
  };

  verifyInput = ({ target }) => {
    this.setState({ valueInput: target.value }, () => {
      const { valueInput } = this.state;
      const minLength = 3;
      if (valueInput.length >= minLength) {
        this.setState({ disabled: false });
      }
    });
  };

  render() {
    const { valueInput, disabled } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            placeholder="Informe seu nome"
            data-testid="login-name-input"
            value={ valueInput }
            onChange={ this.verifyInput }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
