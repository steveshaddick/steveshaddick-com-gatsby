import React, { useRef, useMemo, useEffect, createRef, useState } from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

import { MID_TABLET } from "@global/constants"

/**
 * STYLES
 */

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 100px;
`;

const ListItem = styled.li`
  height: 125px;
  width: 125px;
  padding: 0;
  margin: 10px auto;
  transition: box-shadow 2000ms ease-out;
  box-shadow: rgba(50,50,50,0) 0px 1px 20px 1px;
  vertical-align: top;
  
  &:hover {
    opacity: 1;
    box-shadow: rgba(50,50,50,0.25) 0px 1px 20px 1px;
  }

  @media (hover: none), ${MID_TABLET} {
    height: auto;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
`;

const ListImage = styled(Img)`
  height: 100%;
  width: 100%;
`;

const ListImageComponent = styled.div`
  height: 100%;
  width: 100%;
  transition: opacity 1000ms ease-out;
  padding: 5px;
  background: white;

  @media (hover: none), ${MID_TABLET} {
    height: 100px;
    min-height: 75px;
  }
`

const TitleCardTitle = styled.span`
  color: rgb(45,45,45);
  display: block;
  margin-bottom: 5px;
  font-size: 1.8rem;

  @media (hover: none), ${MID_TABLET} {
    font-size: 1.6rem;
  }
`

const TitleCardType = styled.span`
  color: rgb(145,145,145);
  display: block;
  font-size: 1.4rem;

  @media (hover: none), ${MID_TABLET} {
    font-size: 1.2rem;
  }
`

const TitleCard = styled.div`
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
`

const StyledLink = styled(Link)`
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
      box-shadow: rgba(50,50,50,0.25) 0px 1px 10px 1px;
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
`

const Component = styled.div`
  &.notOver {
    ${StyledLink} {
      transition-duration: 266ms !important;
      transition-delay: 0 !important;
    }
  }

  &.hasOver {
    ${StyledLink} {
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
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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
        font-size: 1.0rem;
      }
    }
  }
`;

/**
 * CODE
 */

function renderListItem (work, onClick, index, refItemLinks, handleItemOver, handleItemOut, currentZIndex) {
  const { contentful_id, slug, image, thumbnail, title, type } = work;

  let itemImage = thumbnail ? thumbnail : image;
  return (
    <ListItem key={contentful_id} style={{ zIndex: currentZIndex - index }}>
      <StyledLink
        to={`/work/${slug}`}
        onClick={onClick}
        onMouseEnter={handleItemOver}
        onMouseLeave={handleItemOut}
        ref={refItemLinks[index]}
        style={{
          transitionDuration: `${parseInt(Math.random() * 2000) + 800}ms`,
          transitionDelay: `${parseInt(Math.random() * 150)}ms`
        }}
      >
        <ListImageComponent>
          <ListImage fluid={itemImage.fluid} />
        </ListImageComponent>
        <TitleCard>
          <TitleCardTitle>{title}</TitleCardTitle>
          <TitleCardType>{type}</TitleCardType>
        </TitleCard>
      </StyledLink>
    </ListItem>
  )
}

const WorksList = ({ onClick, worksData, needFocus, styleType }) => {
  const data = useStaticQuery(graphql`
    query {
      contentfulWorkList(contentful_id: {eq: "1p5V0NNEhIoZedN0PVNirR"}) {
        works {
          contentful_id
          title
          slug
          type
          info
          url
          image {
            title
            description
            fluid(maxWidth: 500, quality: 75, toFormat: JPG) {           
              ...GatsbyContentfulFluid      
            } 
          }
          thumbnail {
            title
            description
            fluid(maxWidth: 100, quality: 75, toFormat: JPG) {           
              ...GatsbyContentfulFluid      
            } 
          }
          description {
            json
          }
        }
      }
    }
  `);
  const { contentfulWorkList: { works } } = data;
  let currentZIndex = 1000
  
  if (!worksData) {
    worksData = works;
  }

  
  const componentRef = createRef()

  function handleItemOver(e) {
    e.currentTarget.classList.add('active')
    componentRef.current.classList.remove('notOver')
    componentRef.current.classList.add('hasOver')
  }
  function handleItemOut(e) {
    e.currentTarget.classList.remove('active')
    componentRef.current.classList.remove('hasOver')
    componentRef.current.classList.add('notOver')
  }

  const refItemLinks= useMemo(
    () => Array.from({ length: worksData.length }).map(() => createRef()),
    [worksData]
  );
  const listItems = worksData.map((work, index) => renderListItem(work, onClick, index, refItemLinks, handleItemOver, handleItemOut, currentZIndex));

  useEffect(() => {
    if (needFocus) {
      if (refItemLinks.length) {
        refItemLinks[0].current.focus()
      }
    }
  }, [needFocus, refItemLinks]);

  return (
    <Component ref={componentRef} className={styleType}>
      <List aria-label="List of works">
        {listItems}
      </List>
    </Component>
  )
}

WorksList.propTypes = {
  onClick: PropTypes.func,
  worksData: PropTypes.array,
  needFocus: PropTypes.bool,
  styleType: PropTypes.string
}

WorksList.defaultProps = {
  needFocus: false,
  styleType: 'grid'
}

export default WorksList;

