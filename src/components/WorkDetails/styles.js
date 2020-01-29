import styled from "styled-components";
import { PALM, MID_TABLET } from "@global/constants";

export const Title = styled.h1`
  margin-bottom: 0;
`;
export const Info = styled.p`
  margin-top: 0;
  color: rgb(100, 100, 100);

  @media ${PALM} {
    font-size: 14px;
  }
`;

export const TitleInfoContainer = styled.div`
  flex: 1 1 auto;
`;

export const NextWorkContainer = styled.div`
  margin: 72px 0;
  width: 100%;
  max-width: 500px;

  h2 {
    font-size: 1.6rem;
    color: rgba(100, 100, 100);
    border-bottom: 1px solid #ccc;
  }
`;

export const UnderBarContainer = styled.div`
  display: flex;

  @media ${MID_TABLET} {
    display: block;
  }
`;

export const Description = styled.div``;

export const Component = styled.div``;
