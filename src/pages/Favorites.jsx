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

  // componentDidMount() {
  //   this.fetchFavoritesSongs();
  // }

  async componentDidMount() {
    const newFavoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, musicFavorites: newFavoriteSongs });
  }

  // fetchFavoritesSongs = async () => {
  //   this.setState({ loading: true }, async () => {
  //     const songsFavorites = await getFavoriteSongs();
  //     this.setState({
  //       musicFavorites: songsFavorites,
  //       loading: false,
  //     });
  //   });
  // };

  handleCallback = async () => {
    const { musicFavorites } = this.state;
    this.setState({ loading: true });
    const newFavoriteSongs = await getFavoriteSongs();
    if (newFavoriteSongs !== musicFavorites) {
      this.setState({ loading: false, musicFavorites: newFavoriteSongs });
    }
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
                callBack={ this.handleCallback }
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
