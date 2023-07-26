import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchBtn,
  SearchBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  onInputChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.warning("Whoops, can't be empty!");
    }

    this.props.onSubmit(this.state.searchQuery);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <Header>
        <SearchForm onSubmit={this.onFormSubmit}>
          <SearchBtn type="submit">
            <SearchBtnLabel>Search</SearchBtnLabel>
          </SearchBtn>

          <SearchFormInput
            onChange={this.onInputChange}
            value={searchQuery}
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}
