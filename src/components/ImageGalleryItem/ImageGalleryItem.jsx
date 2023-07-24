import React from 'react';
import { GalleryItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {
  return (
    <>
      <GalleryItem
        className="gallery-item"
        onClick={() => {
          onClick(largeImageURL);
        }}
      >
        <img src={webformatURL} alt={tags} />
      </GalleryItem>
    </>
  );
};

export default ImageGalleryItem;
