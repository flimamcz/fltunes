import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    valueInput: '',
    disabled: true,
    loading: false,
    dataMusic: [],
    notFoundAlbum: false,
    artistSearch: '',
  };

  searchArtist = ({ target }) => {
    this.setState({ valueInput: target.value }, () => {
      const { valueInput } = this.state;
      const minLength = 2;
      if (valueInput.length >= minLength) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  fetchAlbuns = async () => {
    const { valueInput } = this.state;
    const responseAlbum = await searchAlbumsAPI(valueInput);
    this.setState({ artistSearch: valueInput });
    this.setState({ valueInput: '' });
    this.setState({ loading: true }, async () => {
      this.setState({
        dataMusic: responseAlbum,
        loading: false,
      });

      if (responseAlbum.length <= 0) {
        this.setState({ notFoundAlbum: true });
      } else {
        this.setState({ notFoundAlbum: false });
      }
    });
  };

  render() {
    const {
      valueInput,
      disabled, loading,
      dataMusic, notFoundAlbum, artistSearch,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <form className="form-search" onSubmit={ (e) => e.preventDefault() }>
            <input
              type="text"
              placeholder="Nome do artista"
              value={ valueInput }
              onChange={ this.searchArtist }
              data-testid="search-artist-input"
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ disabled }
              onClick={ this.fetchAlbuns }
            >
              Pesquisar
            </button>
          </form>
        )}

        <div className="artist-container">
          {dataMusic.length > 0 && (
            <p className="result-album">
              Resultado de álbuns de:
              {' '}
              { artistSearch }
            </p>
          )}
          <div className="album-container">
            {dataMusic.length > 0 && dataMusic.map((album) => (
              <div key={ album.collectionId } className="card-album">
                <img src={ album.artworkUrl100 } alt={ album.artistName } />
                <p className="name-album">
                  Album:
                  {' '}
                  {album.collectionName}
                </p>
                <p className="name-artist">{album.artistName}</p>
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                  className="view-album"
                >
                  Ver álbum
                </Link>
              </div>
            ))}
          </div>

          {notFoundAlbum && (
            <p
              className="not-found-album"
            >
              Nenhum álbum foi encontrado!
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
