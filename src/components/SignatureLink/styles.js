import styled from "styled-components";

import { PALM } from "@global/constants";

export const Component = styled.div`
  display: inline-block;
  margin: 0;
  padding: 0;

  a {
  }

  img {
    margin: 0;
    padding-top: 8px;
    height: 40px;

    @media ${PALM} {
      height: 35px;
    }
  }
`;
