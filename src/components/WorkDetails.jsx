import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import InternalLink from "@components/InternalLink"
import NextWork from "@components/NextWork"
import { PALM } from "@global/constants"

const Title = styled.h1`
  margin-bottom: 0;
`
const Info = styled.p`
  margin-top: 0;
  color: rgb(100, 100, 100);

  @media ${PALM} {
    font-size: 14px;
  }
`

const TitleInfoContainer = styled.div`
  flex: 1 1 auto;
`

const NextWorkContainer = styled.div`
  margin-top: 0.67em;
`

const UnderBarContainer = styled.div`
  display: flex;
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
  url,
  nextWork
}) => {
  let infoBits = []
  if (type) {
    infoBits.push((<span key={'WorkDetails_type'}>{type}</span>))
  }
  if (type === 'Website') {
    infoBits.push((<InternalLink key={'WorkDetails_url'} to={url}>{url}</InternalLink>))
  }
  if (info) {
    infoBits.push((<span key={'WorkDetails_info'}>{info}</span>))
  }

  const infoOutput = infoBits.reduce((prev, curr) => [prev, ' ', curr])
  console.log(infoOutput)
  
  return (
    <Container>
      <UnderBarContainer>
        <TitleInfoContainer>
          <Title>{title}</Title>
          <Info>{infoBits.reduce((prev, curr) => [prev, ' ', curr])}</Info>
        </TitleInfoContainer>
        <NextWorkContainer>
          <NextWork work={nextWork} />
        </NextWorkContainer>
      </UnderBarContainer>

      {description &&
        <Description>
          {documentToReactComponents(description.json)}
        </Description>
      }
    </Container>
  )}
)

WorkDetails.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  info: PropTypes.string,
  description: PropTypes.object,
  nextWork: PropTypes.object
}

WorkDetails.defaultProps = {
}

export default WorkDetails
