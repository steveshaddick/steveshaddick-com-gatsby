import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'

import ReactPlayer from 'react-player'
import Spinner from "@components/Spinner"

const Container = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */

  .ReactPlayer {
    position: absolute;
    top: 0;
    left: 0;

    &.not-ready {
      background: rgb(225,225,225);
    }
  }
`

const Player = ({ url, loop, controls }) => {
  const [isReady, setReady] = useState(false);
  const readyClass = !isReady ? 'not-ready' : ''
  
  return (
    <Container>
      <ReactPlayer
        className={`ReactPlayer ${readyClass}`}
        url={url}
        loop={loop}
        controls={controls}
        playing
        width='100%'
        height='100%'
        onReady={()=> { setReady(true); }}
        />
      {!isReady && 
        <Spinner />
      }
    </Container>
  )
}

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
