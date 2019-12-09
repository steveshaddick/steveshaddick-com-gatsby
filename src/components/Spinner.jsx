import React from "react"
import PropTypes from "prop-types"
import styled, { keyframes } from "styled-components"

import spinnerSVG from "@images/spinner.svg"
import spinnerSVG2 from "@images/spinner2.svg"


const imgKeyFrames = keyframes`
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
`

const imgOpacity = keyframes`
  0% {
    opacity: 0.33
  }
  100% {
    opacity: 1
  }
`

const Img1 = styled.img`
  animation: ${imgKeyFrames} 1.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite, ${imgOpacity} 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite alternate;
`
const Img2 = styled.img`
  animation: ${imgKeyFrames} 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite, ${imgOpacity} 3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite alternate;
`

const SpinnersContainer = styled.div`
  width: 50px;
  height: 50px;
  position: relative;

  img {
    width: 100%;
    position: absolute;
  }
`

const Component = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Spinner = () => (
  <Component>
    <SpinnersContainer>
      <Img1 src={spinnerSVG} />
      <Img2 src={spinnerSVG2} />
    </SpinnersContainer>
  </Component>
)

Spinner.propTypes = {
}

Spinner.defaultProps = {
}

export default Spinner
