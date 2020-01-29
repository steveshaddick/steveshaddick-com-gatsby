import styled, { keyframes } from "styled-components";

const imgKeyFrames = keyframes`
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
`;

const imgOpacity = keyframes`
  0% {
    opacity: 0.33
  }
  100% {
    opacity: 1
  }
`;

export const Img1 = styled.img`
  animation: ${imgKeyFrames} 1.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s
      infinite,
    ${imgOpacity} 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite alternate;
`;
export const Img2 = styled.img`
  animation: ${imgKeyFrames} 2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite,
    ${imgOpacity} 3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s infinite alternate;
`;

export const SpinnersContainer = styled.div`
  width: 50px;
  height: 50px;
  position: relative;

  img {
    width: 100%;
    position: absolute;
  }
`;

export const Component = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
