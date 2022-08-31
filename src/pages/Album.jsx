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
        {dataMusics.length ? (
          <div>
            <p data-testid="artist-name">{dataMusics[0].artistName}</p>
            <p data-testid="album-name">{dataMusics[0].collectionName}</p>
            <img src={ dataMusics[0].artworkUrl100 } alt={ dataMusics[0].artistName } />
          </div>
        ) : null}
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
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default Album;
