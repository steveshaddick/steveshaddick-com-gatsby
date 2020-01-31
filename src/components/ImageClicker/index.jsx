import React, { useState } from "react";
import PropTypes from "prop-types";

import { StyledImg, Component } from "./styles";

/**
 * Component definition
 * @param {Props} props
 */
const ImageClicker = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(
    parseInt(Math.random() * images.length)
  );

  function interactHandler() {
    const newIndex =
      activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;
    setActiveImageIndex(newIndex);
  }
  const renderedImages = images.map((image, index) => {
    const classes = activeImageIndex === index ? "active" : "";
    return (
      <li
        key={index}
        className={classes}
        onClick={interactHandler}
        onFocus={interactHandler}
      >
        <StyledImg fluid={image.fluid} alt={image.title} />
      </li>
    );
  });

  return <Component>{renderedImages}</Component>;
};

ImageClicker.propTypes = {
  images: PropTypes.array
};

ImageClicker.defaultProps = {
  images: []
};

export default ImageClicker;
