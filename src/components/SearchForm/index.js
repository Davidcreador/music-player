import React, { Component } from 'react';
import './search-form.scss';


export class SearchForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputVal: ''
    };
  }

  handleChange (e) {
    this.setState({
      inputVal: e.target.value
    });
  }

  handleClick (e) {
    e.preventDefault();
    let valueSearch = this.state.inputVal;
    this.props.search(valueSearch);
  }

  render () {
    return (
      <div className='form-wrapper'>
        <form onSubmit={this.handleClick.bind(this)} className='search-form'>
          <input
            type='text'
            onChange={this.handleChange.bind(this)}
          />
          <input
            type='submit'
            value='Search'
          />
        </form>
      </div>
    );
  }
}
