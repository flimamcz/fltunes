import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    musicFavorites: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchFavoritesSongs();
  }

  // componentDidUpdate() {
  //   this.removeSongs();
  // }

  // removeSongs = () => {
  //   const { musicFavorites } = this.state;
  // };

  fetchFavoritesSongs = async () => {
    const songsFavorites = await getFavoriteSongs();
    this.setState({ loading: true }, async () => {
      this.setState({
        musicFavorites: songsFavorites,
        loading: false,
      });
    });
  };

  render() {
    const { musicFavorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorites">
          {loading ? <Loading /> : (
            musicFavorites.map((music) => (
              <MusicCard
                key={ uuidv4() }
                favoriteSongs={ musicFavorites }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                musicObj={ music }
              />
            )))}
        </div>
      </div>
    );
  }
}

export default Favorites;
