import React from "react"
import { Link, graphql } from "gatsby";
import TransitionLink from "gatsby-plugin-transition-link";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled from 'styled-components';

import Layout from "../components/Layout"
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
  console.log(description);

  return (
    <>
      <SEO title={ title } />
      <Container className="transitionNode enterFore">
        {documentToReactComponents(description.json)}
        <TransitionLink
          to="/work/dusk-lighting"
          exit={{
            length: 1,
            trigger: ({ node, e, exit, entry }) => {
              console.log('this is the exit', node, e, exit, entry)
            }
          }}
          entry={{
            length: 0,
            trigger: ({ node, e, exit, entry }) =>{
              console.log('this is the ENTRY', node, e, exit, entry)
            }
          }}
          >Dusk Lighting</TransitionLink>
      </Container>
    </>
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
