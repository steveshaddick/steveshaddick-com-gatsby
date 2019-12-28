import React, { useRef, useMemo, useEffect, createRef } from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

import { MID_TABLET } from "@global/constants"

/**
 * STYLES
 */
const Container = styled.div`
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
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
`;

const ListItem = styled.li`
  height: 125px;
  width: 125px;
  padding: 0;
  margin: 10px auto;
  transition: box-shadow 2000ms ease-out;
  box-shadow: rgba(50,50,50,0) 0px 1px 20px 1px;
  
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

const ListImageContainer = styled.div`
  height: 100%;
  width: 100%;
  opacity: 0.9;
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
  z-index: 10;
  line-height: 1.1;
  padding: 8px 8px 12px;
  text-align: left;

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

  &.focus-visible,
  &:hover {
    ${TitleCard} {
      opacity: 1;
      top: 85%;
      box-shadow: rgba(50,50,50,0.25) 0px 1px 10px 1px;
    }

    ${ListImageContainer} {
      opacity: 1;
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

/**
 * CODE
 */
function renderListItem (work, onClick, index, refItemLinks) {
  const { contentful_id, slug, image, title, type } = work;
  return (
    <ListItem key={contentful_id}>
      <StyledLink to={`/work/${slug}`} onClick={onClick} ref={refItemLinks[index]}>
        <ListImageContainer>
          <ListImage fluid={image.fluid} />
        </ListImageContainer>
        <TitleCard>
          <TitleCardTitle>{title}</TitleCardTitle>
          <TitleCardType>{type}</TitleCardType>
        </TitleCard>
      </StyledLink>
    </ListItem>
  )
}

const WorksList = ({ onClick }) => {
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
          description {
            json
          }
        }
      }
    }
  `);
  const { contentfulWorkList: { works } } = data;
  const refItemLinks= useMemo(
    () => Array.from({ length: works.length }).map(() => createRef()),
    [works]
  );
  const listItems = works.map((work, index) => renderListItem(work, onClick, index, refItemLinks));

  useEffect(() => {
    refItemLinks[0].current.focus()
  }, [refItemLinks]);

  return (
    <Container>
      <List aria-label="List of works">
        {listItems}
      </List>
    </Container>
  )
}

export default WorksList;

