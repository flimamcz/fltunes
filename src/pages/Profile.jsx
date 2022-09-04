import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    loading: true,
    name: '',
    image: '',
    email: '',
    description: '',
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const { name, email, image, description } = await user;
      this.setState({
        name,
        email,
        image,
        description,
        loading: false,
      });
    });
  };

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div className="profile">
            <div className="profile-section-edit">
              <img data-testid="profile-image" src={ image } alt={ name } width="90" />
              <Link className="button-profile" to="/profile/edit">Editar perfil</Link>
            </div>
            <div>
              <span>Nome:</span>
              <p>{name}</p>
            </div>

            <div>
              <span>Email:</span>
              <p>{email}</p>
            </div>

            <div>
              <span>description:</span>
              <p>{description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
