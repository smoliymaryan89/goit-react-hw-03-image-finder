import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Blocks } from 'react-loader-spinner';
import { Gallery } from './ImageGallery.styled';

import fetchImages from 'api/pixabay-api';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
  static propTypes = {
    imageName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    images: null,
    total: null,
    page: 1,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ images: null, page: 1 }, () => {
        this.onSearchImages();
      });
    }

    if (prevState.page !== this.state.page) {
      this.onSearchImages();
    }
  }

  onSearchImages = async () => {
    this.setState({ isLoading: true });

    try {
      const page = this.state.page;

      const { hits, totalHits } = await fetchImages(this.props.imageName, page);
      if (hits.length === 0) {
        this.setState({ isLoading: false });
        return toast.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      this.setState(prevState => ({
        images: prevState.images ? [...prevState.images, ...hits] : hits,
        total: totalHits,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, error, total, isLoading } = this.state;
    const totalPage = total / images?.length;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {error && toast.error('Something went wrong, please try again!')}

        <Gallery className="gallery">
          {images?.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              onClick={this.props.onClick}
            />
          ))}
        </Gallery>

        {isLoading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
            />
          </div>
        )}

        {totalPage > 1 && !isLoading && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
