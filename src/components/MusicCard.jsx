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
    const songsFavorites = favoriteSongs.find((track) => track.trackId === trackId);
    this.setState({ checked: songsFavorites });
  }

  handleCheckbox = ({ target }) => {
    const isChecked = target.checked;
    this.setState({ checked: isChecked, loading: true }, async () => {
      const { musicObj } = this.props;
      if (isChecked) await addSong(musicObj);
      if (!isChecked) await removeSong(musicObj);
      this.setState({ loading: false });
    });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <div className="music-card">
            <div>
              <p>
                {trackName}
              </p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
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
                onChange={ this.handleCheckbox }
                id="favorite"
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
