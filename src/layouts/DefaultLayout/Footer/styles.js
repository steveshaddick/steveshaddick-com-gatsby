import styled from "styled-components";

import InternalLink from "@components/InternalLink";

import { PALM } from "@global/constants";

export const Container = styled.div`
  margin: 0 auto;
`;

export const WorksListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  max-height: 0;
  overflow: hidden;

  transition: max-height 300ms ease-out;
`;

export const BarContainer = styled.div`
  padding: 5px 0;
  margin: 0 auto;
  max-width: 1200px;

  display: flex;
  justify-content: space-between;
`;

export const BarComponent = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  opacity: 0.85;
  transition: opacity 266ms ease-in-out;
  padding-left: 20px;
  padding-right: 20px;

  &.focus-within,
  &:hover {
    opacity: 1;
  }

  a,
  button {
    color: grey;
    border: none;
    cursor: pointer;
    line-height: 2.4rem;
    padding: 0;
    text-decoration: none;
    background: transparent;
    background-image: linear-gradient(#8ca6b4, #8ca6b4);
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: 0 2px;
    opacity: 0.7;

    transition: background-size 133ms ease-in-out, opacity 266ms ease-out;

    &.focus-visible,
    &:hover {
      background-size: 100% 2px;
      opacity: 1;
    }
  }

  @media ${PALM} {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const Nav = styled.nav`
  display: flex;

  > * {
    margin: auto 10px;
  }
`;

export const InternalLinkStyled = styled(InternalLink)``;

export const FakeLink = styled.button``;

export const Component = styled.div`
  width: 100%;
  position: fixed;
  top: auto;
  bottom: 0;
  transition: top 266ms cubic-bezier(0.86, 0, 0.07, 1), box-shadow 700ms linear;
  background-color: white;
  box-shadow: rgba(100, 100, 100, 0.1) 1px 1px 10px 1px;
  border-top: 1px solid rgb(190, 190, 200, 0.5);

  &:focus-within,
  &:hover {
    box-shadow: rgba(100, 100, 100, 0.35) 1px 1px 10px 1px;
  }

  &.expanded {
    top: 0 !important;
    overflow: auto;
    background-color: #fafafa;
    height: 100vh;

    ${Container} {
      min-height: 100vh;
    }

    ${BarComponent} {
      background: rgba(250, 250, 250, 0.95);
      box-shadow: rgba(50, 50, 50, 0.25) 0px 1px 20px 1px;
      z-index: 10000;
      opacity: 0.95;
    }

    ${WorksListContainer} {
      max-height: 100000000px;
      overflow: visible;
      background-color: #fafafa;
    }
  }
`;
