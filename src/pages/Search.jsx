import React, { Component } from 'react';
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
    this.setState({ loading: true }, async () => {
      const responseAlbum = await searchAlbumsAPI(valueInput);
      this.setState({
        dataMusic: responseAlbum,
        loading: false,
      });

      if (responseAlbum.length <= 0) {
        this.setState({ notFoundAlbum: true });
      }

      // if (responseAlbum.length > 0) {
      //   this.setState({ notFoundAlbum: false });
      // }
    });
  };

  render() {
    const { valueInput, disabled, loading, dataMusic, notFoundAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <form onSubmit={ (e) => e.preventDefault() }>
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

        <div className="artist">
          {dataMusic.length ? (
            <p>
              Resultado de álbuns de:
              {' '}
              { valueInput }
            </p>
          ) : null}

          {dataMusic.length > 0 && dataMusic.map((album) => (
            <div key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt={ album.artistName } />
              <p>
                Album:
                {' '}
                {album.collectionName}
              </p>
              <p>{album.artistName}</p>
              {console.log(album)}
            </div>
          ))}

          {notFoundAlbum && <p>Nenhum álbum foi encontrado!</p>}
        </div>
      </div>
    );
  }
}

export default Search;
