import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    dataMusics: [],
    musicFilter: [],
  };

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await musicsAPI(id);
    this.setState({
      dataMusics: musics,
      musicFilter: musics.filter((music, index) => index !== 0),
    });
  };

  render() {
    const { dataMusics, musicFilter } = this.state;
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
        {musicFilter.map(({ trackName, previewUrl }) => (
          <MusicCard
            key={ uuidv4() }
            trackName={ trackName }
            previewUrl={ previewUrl }
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
