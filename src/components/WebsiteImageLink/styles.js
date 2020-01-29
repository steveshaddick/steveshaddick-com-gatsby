import styled, { keyframes } from "styled-components";

import Img from "gatsby-image";

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
`;

export const ImgStyled = styled(Img)``;

export const TextContainer = styled.div`
  background: #fff;
  padding: 20px 35px;
  border-radius: 3px;
`;

export const ArrowWrapper = styled.span`
  position: relative;
  display: inline-block;

  img {
    position: absolute;
    left: 0;
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  color: #4a6573;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 266ms ease-in-out, background-color 266ms ease-in-out;
  z-index: 2;

  img {
    transform: translate3d(0, 0, 0);
    opacity: 0;
    /*transition: transform 266ms ease-out;*/
  }
`;

export const Component = styled.a`
  position: relative;
  display: block;

  &.focus-visible,
  &:hover {
    ${ImageOverlay} {
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.5);

      .WebsiteImageLink_arrow1 {
        animation: ${arrowKeyframes} 2s ease-in-out 0.5s infinite;
      }
      .WebsiteImageLink_arrow2 {
        animation: ${arrowKeyframes} 2s ease-in-out 1.5s infinite;
      }
    }
  }
`;
