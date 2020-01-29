import React from "react";

import { Component, SpinnersContainer, Img1, Img2 } from "./styles";

import spinnerSVG from "@images/spinner.svg";
import spinnerSVG2 from "@images/spinner2.svg";

/**
 * Component definition
 */
const Spinner = () => (
  <Component>
    <SpinnersContainer>
      <Img1 src={spinnerSVG} />
      <Img2 src={spinnerSVG2} />
    </SpinnersContainer>
  </Component>
);

Spinner.propTypes = {};

Spinner.defaultProps = {};

export default Spinner;
