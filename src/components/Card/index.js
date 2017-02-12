import React, { Component } from 'react';

import './card.scss';

export default class Card extends Component {
  constructor (props) {
    super(props);
    this.state = {
      favorite: false
    };
  }

  favorite () {
    this.setState({ favorite: true });
  }

  unfavorite () {
    this.setState({ favorite: false });
  }

  render () {
    const cardStyle = {
      backgroundImage: `url(${this.props.album.images[1].url})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    let favoriteStar = (
      <i
        className='close-btn fa fa-star-o'
        ref={ref => this.iconFav = ref}
        onClick={this.favorite.bind(this)}
      />
    );
    if (this.state.favorite) {
      favoriteStar = (
        <i
          className='close-btn fa fa-star'
          ref={ref => this.iconFav = ref}
          onClick={this.unfavorite.bind(this)}
        />
      );
    }
    return (
      <div
        className='card'
        style={cardStyle}>
        <div className='card-content' />
        <h2 className='card-title'>{this.props.album.name}</h2>
        {favoriteStar}
      </div>
    );
  }
}
