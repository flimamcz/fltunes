import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    valueInput: '',
    disabled: true,
    loading: false,
    loggedIn: false,
  };

  verifyInput = ({ target }) => {
    this.setState({ valueInput: target.value }, () => {
      const { valueInput } = this.state;
      const minLength = 3;
      if (valueInput.length >= minLength) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  fetchCreateUser = async () => {
    const { valueInput } = this.state;
    this.setState({ loading: true }, async () => {
      const responseCreateUser = await createUser({ name: valueInput });
      this.setState({ loading: false });
      if (responseCreateUser === 'OK') {
        this.setState({ loggedIn: true });
      }
    });
  };

  render() {
    const { valueInput, disabled, loading, loggedIn } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : (
          <form onSubmit={ (e) => e.preventDefault() }>
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
              onClick={ this.fetchCreateUser }
            >
              Entrar
            </button>
          </form>
        )}

        {loggedIn ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}

export default Login;
