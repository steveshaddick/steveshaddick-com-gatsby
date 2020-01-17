import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import InternalLink from "@components/InternalLink"
import WorksList from "@components/WorksList"
import { PALM, MID_TABLET } from "@global/constants"

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
  margin: 24px 0;
  width: 100%;
  max-width: 500px;

  h2 {
    font-size: 1.6rem;
    color: rgba(100,100,100);
    border-bottom: 1px solid #ccc;
  }
`

const UnderBarContainer = styled.div`
  display: flex;

  @media ${MID_TABLET} {
    display: block;
  }
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
  nextWorks
}) => {
  let infoBits = []
  if (type === 'Website') {
    const displayUrl = url.replace('http://', '').replace('https://', '')
    console.log(url);
    infoBits.push((<InternalLink key={'WorkDetails_url'} to={url}>{displayUrl}</InternalLink>))
  }
  if (info) {
    infoBits.push((<span key={'WorkDetails_info'}>{info}</span>))
  }

  if (!infoBits.length) {
    infoBits.push('')
  }
  
  return (
    <Container>
      <UnderBarContainer>
        <TitleInfoContainer>
          <Title>{title}</Title>
          <Info>{infoBits.reduce((prev, curr) => [prev, ' ', curr])}</Info>
        </TitleInfoContainer>
      </UnderBarContainer>

      {description &&
        <Description>
          {documentToReactComponents(description.json)}
        </Description>
      }
      <NextWorkContainer>
        <h2>Next Up</h2>
        <WorksList worksData={nextWorks} styleType="list" />
      </NextWorkContainer>
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
