import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'

import ReactPlayer from 'react-player'

const VideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */

  .ReactPlayer {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const Video = ({ videoId, loop, controls }) => (
  <VideoWrapper>
    <ReactPlayer
      className="ReactPlayer"
      url={`https://vimeo.com/${videoId}`}
      playing
      width='100%'
      height='100%'
      />
  </VideoWrapper>
)

Video.propTypes = {
  videoId: PropTypes.string,
  loop: PropTypes.bool,
  controls: PropTypes.bool
}

Video.defaultProps = {
  videoId: ``,
  loop: true,
  controls: true,
}

export default Video
