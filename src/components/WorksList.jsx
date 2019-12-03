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
  padding: 5px;
  margin: 5px;
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
  opacity: 0.9;
  transition: opacity 1000ms ease-out;
`;

const TitleCard = styled.div`
  position: absolute;
  width: 100%;
  background: white;
  top: 0;
  opacity: 0;
  transition: opacity 266ms ease-out, top 266ms cubic-bezier(0.86, 0, 0.07, 1);
  z-index: 10;
  color: rgb(45,45,45);
  line-height: 1.1;
  padding: 5px 5px 10px;
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
      top: 100%;
      box-shadow: rgba(50,50,50,0.25) 0px 10px 10px 1px;
    }

    ${ListImage} {
      opacity: 1;
    }
  }
`

/**
 * CODE
 */
function renderListItem (work, onClick) {
  const { contentful_id, slug, image, title } = work;
  console.log(work)
  return (
    <ListItem key={contentful_id}>
      <StyledLink to={`/work/${slug}`} onClick={onClick}>
        <TitleCard>{title}</TitleCard>
        <ListImage fluid={image.fluid} />
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

