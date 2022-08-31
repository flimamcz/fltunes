import React, { Component } from 'react';
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
        {loading ? <Loading /> : <p data-testid="header-user-name">{user.name}</p>}
      </header>
    );
  }
}

export default Header;
