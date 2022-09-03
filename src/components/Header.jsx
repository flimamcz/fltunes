import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Logo from '../assets/images/logo-white.svg';
import IconUser from '../assets/images/icon-user.svg';

class Header extends Component {
  state = {
    user: {},
    loading: false,
  };

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = async () => {
    this.setState({ loading: true }, async () => {
      const userInfo = await getUser();
      this.setState({
        user: userInfo,
        loading: false,
      });
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header className="header-container" data-testid="header-component">
        <div className="header">
          <div className="logo-header">
            <img src={ Logo } alt="Logo fl tunes" />
          </div>
          <ul className="navbar">
            <li>
              <Link
                className="color-white"
                data-testid="link-to-search"
                to="/search"
              >
                Pesquisar
              </Link>
            </li>
            <li>
              <Link
                className="color-white"
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favoritas
              </Link>
            </li>
            <li>
              <Link
                className="color-white"
                data-testid="link-to-profile"
                to="/profile"
              >
                Perfil
              </Link>
            </li>
            {loading ? <Loading /> : (
              <p className="user" data-testid="header-user-name">
                <img src={ IconUser } alt="icon user profile" width="27" />
                {user.name}
              </p>
            )}
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
