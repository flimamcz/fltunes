import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    valueInput: '',
    disabled: true,
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

  render() {
    const { valueInput, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
