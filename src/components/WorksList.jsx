import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'
import { Link } from "gatsby";

function renderListItem (work) {
  const { contentful_id, slug } = work;
  return (
    <li key={contentful_id}>
      <Link to={`/work/${slug}`}>{slug}</Link>
    </li>
  )
}

const WorksList = ({ works }) => {
  const listItems = works.map(renderListItem);
  
  return (
    <ul>
      {listItems}
    </ul>
  )
}

WorksList.propTypes = {
  works: PropTypes.arrayOf(PropTypes.shape({
    contentful_id: PropTypes.string,
    slug: PropTypes.string
  }))
}

export default WorksList
