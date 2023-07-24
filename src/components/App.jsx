import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    largeImageUrl: '',
  };

  onSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImgClick = largeImageUrl => {
    this.setState({ largeImageUrl });
    this.toggleModal();
  };

  render() {
    const { searchQuery, showModal, largeImageUrl } = this.state;

    return (
      <>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery onClick={this.onImgClick} imageName={searchQuery} />
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageUrl={largeImageUrl} />
        )}
      </>
    );
  }
}
