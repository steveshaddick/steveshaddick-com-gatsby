import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import InternalLink from "@components/InternalLink"

const Title = styled.h1`
  margin-bottom: 0;
`
const Info = styled.p`
  margin-top: 0;
  color: rgb(100, 100, 100);
`
const Description = styled.div`
`

const Container = styled.div`
`

const WorkDetails = React.memo(({
  title,
  type,
  info,
  description,
  url
}) => {
  let infoBits = []
  if (type) {
    infoBits.push((<span>{type}</span>))
  }
  if (type === 'Website') {
    infoBits.push((<InternalLink>{url}</InternalLink>))
  }
  if (info) {
    infoBits.push((<span>{info}</span>))
  }

  const infoOutput = infoBits.reduce((prev, curr) => [prev, ' ', curr])
  console.log(infoOutput)
  
  return (
    <Container>
      <Title>{title}</Title>
      <Info>{infoBits.reduce((prev, curr) => [prev, ' ', curr])}</Info>
      {description &&
        <Description>
          {documentToReactComponents(description.json)}
        </Description>
      }
    </Container>
  )})

WorkDetails.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  info: PropTypes.string,
  description: PropTypes.string
}

WorkDetails.defaultProps = {
}

export default WorkDetails
