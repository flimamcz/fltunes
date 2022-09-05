import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    checked: false,
    loading: false,
  };

  componentDidMount() {
    const { favoriteSongs, trackId } = this.props;
    const songsFavorites = favoriteSongs.some((track) => track.trackId === trackId);
    this.setState({ checked: songsFavorites });
  }

  handleCheckbox = async (obj, func) => {
    const { callBack } = this.props;
    const { checked } = this.state;
    this.setState({ loading: true });
    if (checked) {
      await removeSong(obj);
      this.setState({ checked: false });
    } else {
      await addSong(obj);
      this.setState({ checked: true });
    }
    if (callBack) func();
    this.setState({ loading: false });
  };

  render() {
    const { previewUrl, trackName, trackId, musicObj, callBack } = this.props;
    const { checked, loading } = this.state;
    return (
      <div className="container-music-card">
        {loading ? <Loading /> : (
          <div className="container-music-card">
            <p>
              {trackName}
            </p>
            <div>
              <audio
                className="audio-ctrl"
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                checked={ checked }
                onChange={ () => this.handleCheckbox(musicObj, callBack) }
                id="favorite"
                className="input-music-card"
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
