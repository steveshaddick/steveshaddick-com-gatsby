import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'

import ReactPlayer from 'react-player'

const Container = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */

  .ReactPlayer {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const Player = ({ url, loop, controls }) => (
  <Container>
    <ReactPlayer
      className="ReactPlayer"
      url={url}
      playing
      width='100%'
      height='100%'
      />
  </Container>
)

Player.propTypes = {
  url: PropTypes.string,
  loop: PropTypes.bool,
  controls: PropTypes.bool
}

Player.defaultProps = {
  url: ``,
  loop: true,
  controls: true,
}

export default Player
