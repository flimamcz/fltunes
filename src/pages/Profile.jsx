import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    loading: false,
    user: {},
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({
        user,
        loading: false,
      });
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
            <Link to="/profile/edit">Editar perfil</Link>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
