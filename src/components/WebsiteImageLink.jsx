import React from "react"
import PropTypes from "prop-types"
import styled, { keyframes } from "styled-components"

import Img from "gatsby-image"
import arrowIconSVG from "@images/arrow_right_alt-24px.svg"

 
const arrowKeyframes = keyframes`
  0% {
    left: 0;
    opacity: 0;
  }
  15% {
    left: 15px;
    opacity: 1;
  }
  100% {
    left: 100px;
    opacity: 0;
  }
`


const StyledImg = styled(Img)`
`

const TextContainer = styled.div`
  background: #fff;
  padding: 20px 35px;
  border-radius: 3px;
`

const ArrowWrapper = styled.span`
  position: relative;
  display:inline-block;

  img {
    position: absolute;
    left: 0;
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  color: #4A6573;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 266ms ease-in-out, background-color 266ms ease-in-out;
  z-index: 2;

  img {
    transform: translate3d(0,0,0);
    opacity: 0;
    /*transition: transform 266ms ease-out;*/
  }
`

const Container = styled.a`
  position: relative;
  display: block;

  &.focus-visible,
  &:hover {
    ${ImageOverlay} {
      opacity: 1;
      background-color: rgba(255,255,255,0.5);

      .WebsiteImageLink_arrow1 {
        animation: ${arrowKeyframes} 2s ease-in-out 0.5s infinite;
      }
      .WebsiteImageLink_arrow2 {
        animation: ${arrowKeyframes} 2s ease-in-out 1.5s infinite;
      }
    }
  }
`


const WebsiteImageLink = ({image, title, url}) => (
  <Container href={url} rel="noopener noreferrer" target="_blank" aria-label={`View ${title} website`}>
    <StyledImg fluid={image.fluid} alt={image.title} />
    <ImageOverlay>
      <TextContainer>
        <span style={{display: 'inline-block'}}>Visit site</span> <ArrowWrapper>&nbsp;<img className="WebsiteImageLink_arrow1" src={arrowIconSVG} alt="" /> <img className="WebsiteImageLink_arrow2" src={arrowIconSVG} alt="" /></ArrowWrapper>
      </TextContainer>
    </ImageOverlay>
  </Container>
)

WebsiteImageLink.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  url: PropTypes.string
}

WebsiteImageLink.defaultProps = {
}

export default WebsiteImageLink
