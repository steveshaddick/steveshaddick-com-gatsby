import styled from "styled-components";

export const Component = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */

  .ReactPlayer {
    position: absolute;
    top: 0;
    left: 0;

    &.not-ready {
      background: rgb(225, 225, 225);
    }
  }
`;
