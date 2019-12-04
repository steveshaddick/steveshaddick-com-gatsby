import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

/**
 * STYLES
 */
const Container = styled.div`
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ListItem = styled.li`
  height: 125px;
  width: 125px;
  padding: 0;
  margin: 10px;
  transition: box-shadow 2000ms ease-out;
  box-shadow: rgba(50,50,50,0) 0px 1px 20px 1px;

  &:hover {
    opacity: 1;
    box-shadow: rgba(50,50,50,0.25) 0px 1px 20px 1px;
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
`

const TitleCardTitle = styled.span`
  color: rgb(45,45,45);
  display: block;
  margin-bottom: 5px;
  font-size: 1.8rem;
`

const TitleCardType = styled.span`
  color: rgb(145,145,145);
  display: block;
  font-size: 1.4rem;
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
`

const StyledLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

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
`

/**
 * CODE
 */
function renderListItem (work, onClick) {
  const { contentful_id, slug, image, title, type } = work;
  console.log("IMAGE", image.fluid)
  return (
    <ListItem key={contentful_id}>
      <StyledLink to={`/work/${slug}`} onClick={onClick}>
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
  const listItems = works.map((work) => renderListItem(work, onClick));

  return (
    <Container>
      <List>
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
        {listItems}
      </List>
    </Container>
  )
}

export default WorksList;

