import styled from "styled-components";
import { Link } from "gatsby";

import Img from "gatsby-image";

import { MID_TABLET } from "@global/constants";

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 100px;
`;

export const ListItem = styled.li`
  height: 100px;
  width: 100px;
  padding: 0;
  margin: 10px auto;
  transition: box-shadow 2000ms ease-out;
  box-shadow: rgba(50, 50, 50, 0) 0px 1px 20px 1px;
  vertical-align: top;

  &:hover {
    opacity: 1;
    box-shadow: rgba(50, 50, 50, 0.25) 0px 1px 20px 1px;
  }

  @media (hover: none), ${MID_TABLET} {
    height: auto;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
`;

export const ListImage = styled(Img)`
  height: 100%;
  width: 100%;
`;

export const ListImageComponent = styled.div`
  height: 100%;
  width: 100%;
  transition: opacity 1000ms ease-out;
  padding: 5px;
  background: white;

  @media (hover: none), ${MID_TABLET} {
    height: 100px;
    min-height: 75px;
  }
`;

export const TitleCardTitle = styled.span`
  color: rgb(45, 45, 45);
  display: block;
  margin-bottom: 5px;
  font-size: 1.6rem;

  @media (hover: none), ${MID_TABLET} {
    font-size: 1.5rem;
  }
`;

export const TitleCardType = styled.span`
  color: rgb(145, 145, 145);
  display: block;
  font-size: 1.4rem;

  @media (hover: none), ${MID_TABLET} {
    font-size: 1.2rem;
  }
`;

export const TitleCard = styled.div`
  position: absolute;
  width: calc(100% + 10px);
  background: white;
  top: 0;
  opacity: 0;
  transition: opacity 266ms ease-out, top 266ms cubic-bezier(0.86, 0, 0.07, 1);
  z-index: 100;
  line-height: 1.1;
  padding: 8px 8px 12px;
  text-align: left;
  pointer-events: none;

  @media (hover: none), ${MID_TABLET} {
    position: static;
    opacity: 1;
    width: 100%;
  }
`;

export const LinkStyled = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transition: filter 266ms ease-out, opacity 266ms ease-out;
  /*-webkit-transition: -webkit-filter 3000ms ease-out;*/
  filter: grayscale(0%);
  opacity: 1;

  &.focus-visible,
  &:hover {
    ${TitleCard} {
      opacity: 1;
      top: 85%;
      box-shadow: rgba(50, 50, 50, 0.25) 0px 1px 10px 1px;
    }
  }

  @media (hover: none), ${MID_TABLET} {
    text-decoration: none;

    &:hover {
      ${TitleCard} {
        top: auto;
        box-shadow: none;
      }
    }
  }
`;

export const Component = styled.div`
  &.notOver {
    ${LinkStyled} {
      transition-duration: 266ms !important;
      transition-delay: 0 !important;
    }
  }

  &.hasOver {
    ${LinkStyled} {
      filter: grayscale(100%);
      opacity: 0.9;

      &.active {
        filter: grayscale(0%);
        opacity: 1;
      }
    }
  }

  &.grid {
    ${List} {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: auto;

      @media (max-width: 1000px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      }
      @media (max-width: 767px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
      @media (max-width: 550px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
      @media (max-width: 400px) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  &.list {
    ${List} {
      margin-left: -5px;
    }
    ${ListItem} {
      height: 90px;
      width: 90px;
      display: inline-block;
      margin: 0 5px;
    }

    ${TitleCardTitle} {
      font-size: 1.6rem;

      @media (hover: none), ${MID_TABLET} {
        font-size: 1.4rem;
      }
    }

    ${TitleCardType} {
      font-size: 1.2rem;

      @media (hover: none), ${MID_TABLET} {
        font-size: 1rem;
      }
    }
  }
`;
