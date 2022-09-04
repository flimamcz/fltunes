import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    dataMusics: [],
    musicFilter: [],
    songFavorites: [],
  };

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await musicsAPI(id);
    this.setState({
      dataMusics: musics,
      musicFilter: musics.filter((_music, index) => index !== 0),
    });

    const FavoriteSongs = await getFavoriteSongs();
    this.setState({ songFavorites: FavoriteSongs });
  };

  render() {
    const { dataMusics, musicFilter, songFavorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="profile-album">
          {dataMusics.length ? (
            <div className="perfil-album">
              <img
                src={ dataMusics[0].artworkUrl100 }
                alt={ dataMusics[0].artistName }
                width="260"
              />
              <p
                className="artist-name-album"
                data-testid="artist-name"
              >
                {dataMusics[0].artistName}
              </p>
              <p
                className="album-name"
                data-testid="album-name"
              >
                {dataMusics[0].collectionName}
              </p>
            </div>
          ) : null}
          <div className="music-card">
            {musicFilter.map((music) => (
              <MusicCard
                key={ uuidv4() }
                favoriteSongs={ songFavorites }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                musicObj={ music }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default Album;
