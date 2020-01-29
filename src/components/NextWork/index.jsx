import React, { useState } from "react";
import PropTypes from "prop-types";

import { Component, InternalLinkStyled, NextWorkImage, Text } from "./styles";

/**
 * Component definition
 * @param {Props} props
 */
const NextWork = ({ className, work, handleOnOver, handleOnOut }) => {
  const { title, image, slug } = work;

  const [isActive, setActive] = useState(false);
  const classes = isActive ? `${className} active` : className;

  return (
    <Component
      className={classes}
      onMouseOver={() => {
        setActive(true);
        if (handleOnOver) handleOnOver();
      }}
      onMouseOut={() => {
        setActive(false);
        if (handleOnOut) handleOnOut();
      }}
    >
      <InternalLinkStyled to={`/work/${slug}`} type="Work">
        <NextWorkImage fluid={image.fluid} />
        <Text>{title}</Text>
      </InternalLinkStyled>
    </Component>
  );
};

NextWork.propTypes = {
  className: PropTypes.string,
  work: PropTypes.object,
  handleOnOver: PropTypes.func,
  handleOnOut: PropTypes.func
};

NextWork.defaultProps = {};

export default NextWork;
