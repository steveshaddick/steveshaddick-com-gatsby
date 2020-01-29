import styled from "styled-components";

import { PALM } from "@global/constants";

export const Component = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding-bottom: 100px;
  background: #fafafa;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;

  @media ${PALM} {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
  }
`;
