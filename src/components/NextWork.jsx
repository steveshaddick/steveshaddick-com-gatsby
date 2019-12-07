import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Img from "gatsby-image"
import InternalLink from "@components/InternalLink"

const NextWorkImage = styled(Img)`
  width: 75px;
  height: 75px;
`

const Text = styled.span`
`

const Component = styled.div`
  width: 175px;
  position: relative;
`

const NextWork = ({ work }) => {
  const {
    image,
    slug
  } = work

  return (
    <Component>
      <InternalLink to={`/work/${slug}`} type="Work">
        <NextWorkImage fluid={image.fluid} />
        <Text>Next one</Text>
      </InternalLink>
    </Component>
  )
}

NextWork.propTypes = {
  work: PropTypes.object
}

NextWork.defaultProps = {
}

export default NextWork
