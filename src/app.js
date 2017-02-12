import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './app.scss';

// Components
import Header from './components/Header/';
import { SearchForm } from './components/SearchForm/';
import Card from './components/Card/';

const apiUrl = 'https://api.spotify.com/v1';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      albums: []
    };
  }

  search (search) {
    let artists = search.split(',');
    artists.map((artist) => {
      return this.searchArtist(artist)
        .then((...results) => {
          results = results.map(res => res.data.artists.items[0].id)
            .map(id => this.getArtistAlbums(id)
              .then((...results) => {
                this.setState({
                  albums: results[0].data.items
                });
              })
            );
        });
    });
  }

  searchArtist (artistName) {
    return axios.get(`${apiUrl}/search`, {
      params: {
        q: artistName,
        type: 'artist'
      }
    });
  }

  getArtistAlbums (artistId) {
    return axios.get(`${apiUrl}/artists/${artistId}/albums`, {
      data: {
        album_type: 'album'
      }
    });
  }

  render () {
    return (
      <div>
        <Header />
        <SearchForm search={this.search.bind(this)} />
        <div className='grid'>
          {this.state.albums.map(album => {
            return (
              <Card key={album.id} album={album} />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
