import styled from "styled-components";

import NextWork from "@components/NextWork";

export const NextWorkStyled = styled(NextWork)`
  transition: 200ms opacity ease-out;
  margin-right: 25px;
`;

export const Component = styled.div`
  &.hasOver {
    ${NextWorkStyled} {
      opacity: 0.5;

      &.active {
        opacity: 1;
        z-index: 10;
      }
    }
  }
`;
