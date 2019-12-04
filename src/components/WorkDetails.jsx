import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

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

const WorkDetails = ({
  title,
  type,
  info,
  description,
  url
}) => (
  <Container>
    <Title>{title}</Title>
    <Info>{type} {info}</Info>
    {description &&
      <Description>
        {documentToReactComponents(description.json)}
      </Description>
    }
  </Container>
)

WorkDetails.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  info: PropTypes.string,
  description: PropTypes.string
}

WorkDetails.defaultProps = {
}

export default WorkDetails
