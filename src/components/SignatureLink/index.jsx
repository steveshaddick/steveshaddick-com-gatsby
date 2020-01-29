import React from "react";

import { Component } from "./styles";

import signature from "@images/signature.png";

/**
 * Component definition
 */
const SignatureLink = () => (
  <Component>
    <a href="/">
      <img src={signature} alt="Steve Shaddick" />
    </a>
  </Component>
);

SignatureLink.propTypes = {};

SignatureLink.defaultProps = {};

export default SignatureLink;
