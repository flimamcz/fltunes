import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        <nav>
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search"> Pesquisar</Link>
            </li>

            <li>
              <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
            </li>

            <li>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </li>
          </ul>
        </nav>
        <div>
          {loading ? <Loading /> : (
            <p data-testid="header-user-name">
              <span>Usuario</span>
              {user.name}
            </p>)}
        </div>
      </header>
    );
  }
}

export default Header;
