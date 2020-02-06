import React, { useState } from "react";
import PropTypes from "prop-types";

import ReactPlayer from "react-player";
import Spinner from "@components/Spinner";

import { Component } from "./styles";

/**
 * Component definition
 * @param {Props} props
 */
const Player = ({ url, loop, controls }) => {
  const [isReady, setReady] = useState(false);
  const readyClass = !isReady ? "not-ready" : "";

  return (
    <Component>
      <ReactPlayer
        className={`ReactPlayer ${readyClass}`}
        url={url}
        loop={loop}
        controls={true}
        playing
        width="100%"
        height="100%"
        onReady={() => {
          setReady(true);
        }}
      />
      {!isReady && <Spinner />}
    </Component>
  );
};

Player.propTypes = {
  url: PropTypes.string,
  loop: PropTypes.bool,
  controls: PropTypes.bool
};

Player.defaultProps = {
  url: ``,
  loop: true,
  controls: true
};

export default Player;
