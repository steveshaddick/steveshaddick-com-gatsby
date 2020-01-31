import styled from "styled-components";

import Img from "gatsby-image";

import { MID_TABLET } from "@global/constants";

export const StyledImg = styled(Img)`
  @media ${MID_TABLET} {
    height: 100%;
  }
`;

export const Component = styled.ul`
  position: relative;
  width: 100%;

  @media ${MID_TABLET} {
    height: 50vh;
  }

  li {
    list-style: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    pointer-events: none;
    transition: opacity 345ms ease-out;
    opacity: 0;
    width: 100%;

    @media ${MID_TABLET} {
      height: 100%;
    }

    &.active {
      pointer-events: auto;
      opacity: 1;
      z-index: 10;
    }
  }
`;
