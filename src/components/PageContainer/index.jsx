import React from "react";
import PropTypes from "prop-types";

import { Component } from "./styles";

/**
 * Component definition
 * @param {Props} props
 */
const PageContainer = ({ children, className }) => (
  <Component className={className}>{children}</Component>
);

PageContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

PageContainer.defaultProps = {};

export default PageContainer;
