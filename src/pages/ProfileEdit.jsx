import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    image: '',
    description: '',
    buttonDisabled: true,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const { name, email, description, image } = await user;
      this.setState({
        loading: false,
        name,
        email,
        image,
        description,
      });
    });
  };

  handleInput = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      const { name: nameInput, email, image, description } = this.state;
      const isFilled = (nameInput.length > 0)
        && (email.length > 0)
        && (image.length > 0)
        && (description.length > 0);
      const regex = /\S+@\S+\.\S+/;
      const isEmail = regex.test(email);
      if (isFilled && isEmail) {
        this.setState({ buttonDisabled: false });
      } else this.setState({ buttonDisabled: true });
    });
  };

  updateUser = async () => {
    const { name, email, description, image } = this.state;
    const userUpdate = {
      name,
      email,
      description,
      image,
    };

    this.setState({ loading: true }, async () => {
      const response = await updateUser(userUpdate);
      const { history } = this.props;
      if (response === 'OK') {
        this.setState({ loading: false });
        history.push('/profile');
      }
    });
  };

  render() {
    const {
      loading, name, email,
      description, image,
      buttonDisabled,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="name">
              Nome
              <span>Fique a vontade para usar seu nome social</span>
              <input
                type="text"
                data-testid="edit-input-name"
                name="name"
                id="name"
                value={ name }
                onChange={ this.handleInput }
              />
            </label>

            <label htmlFor="email">
              Email
              <span>Informe seu melhor email</span>
              <input
                type="email"
                name="email"
                id="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleInput }
              />
            </label>

            <label htmlFor="description">
              Descrição
              <textarea
                id="description"
                cols="30"
                name="description"
                rows="5"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleInput }
              />
            </label>

            <input
              type="text"
              data-testid="edit-input-image"
              placeholder="Insira um link"
              name="image"
              value={ image }
              onChange={ this.handleInput }
            />

            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ buttonDisabled }
              onClick={ this.updateUser }
            >
              Editar perfil
            </button>
          </form>
        )}
        {/* {redirect && <Redirect to="/profile" />} NÃO FUNCINOU */}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default ProfileEdit;
