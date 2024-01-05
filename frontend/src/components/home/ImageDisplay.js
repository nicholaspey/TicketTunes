// ImageDisplay.js
import React from 'react';

function ImageDisplay({ imagePath }) {
  return (
    <img src={imagePath} alt="Dynamic Image" style={{ height: '175px' }} />
  );
}

export default ImageDisplay;
