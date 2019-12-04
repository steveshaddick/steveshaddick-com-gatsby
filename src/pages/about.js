import React from "react"
import { Link, graphql } from "gatsby";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled from 'styled-components';

import PageContainer from "@components/PageContainer"
import InternalLink from "@components/InternalLink"
import SEO from "../components/seo"

const Container = styled.div`
  transition: all 1000ms ease-out;

  &.transitionOut {
    opacity: 0;
    transform: scale(0.25);
  }

  &.transitionIn {
    opacity: 0;
    transform: scale(0.25);
  }
`

const AboutPage = ({ data: { contentfulPage: { title, description } } }) => {

  return (
    <PageContainer className="transitionNode enterFore exitFore">
      <SEO title={ title } />
      <Container>
        {documentToReactComponents(description.json)}
        <InternalLink
          to="/work/dusk-lighting"
          pageType="Work"
          >Dusk Lighting</InternalLink>
      </Container>
    </PageContainer>
  )
}

export default AboutPage;

export const pageQuery = graphql`
  query {
    contentfulPage(contentful_id: {eq: "usCaa35pPfFCMcCIICqxM"}) {
      contentful_id
      title
      slug
      description {
        json
      }
    }
  }
`;
