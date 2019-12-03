import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from "gatsby";

const Container = styled.div`
`;

function renderListItem (work, onClick) {
  const { contentful_id, slug } = work;
  return (
    <li key={contentful_id}>
      <Link to={`/work/${slug}`} onClick={onClick}>{slug}</Link>
    </li>
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
          image {
            title
            url
          }
          thumbnail {
            title
            url
          }
          info
          url
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
      <ul>
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
      </ul>
    </Container>
  )
}

export default WorksList;

