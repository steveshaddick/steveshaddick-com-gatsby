import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled from 'styled-components';
import RichText from '@madebyconnor/rich-text-to-jsx';
import { BLOCKS } from '@contentful/rich-text-types'

import Img from "gatsby-image"

import PageContainer from "@components/PageContainer"
import InternalLink from "@components/InternalLink"
import SEO from "../components/seo"

const RandomWorkContainer = styled.div`
`

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


const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const imagedata = {
        aspectRatio: 1,
        sizes: "(max-width: 500px) 100vw, 500px",
        src: `${node.data.target.fields.file['en-CA'].url}?w=500&q=75&fm=jpg`,
        srcSet: `${node.data.target.fields.file['en-CA'].url}?w=125&h=94&q=75&fm=jpg 125w,\n${node.data.target.fields.file['en-CA'].url}?w=250&h=188&q=75&fm=jpg 250w,\n${node.data.target.fields.file['en-CA'].url}?w=500&h=375&q=75&fm=jpg 500w,\n${node.data.target.fields.file['en-CA'].url}?w=750&h=563&q=75&fm=jpg 750w,\n${node.data.target.fields.file['en-CA'].url}?w=1000&h=751&q=75&fm=jpg 1000w,\n${node.data.target.fields.file['en-CA'].url}?w=1500&h=1126&q=75&fm=jpg 1500w`
      }
      console.log("EMBED", node)
      return <Img fluid={imagedata} />
    }
  }
};

const AboutPage = ({ data: { contentfulPage: { title, description }, contentfulWorkList: { works } } }) => {

  const [randomIndex] = useState(Math.floor(Math.random() * works.length))
  const randomWork = works[randomIndex]

  console.log(description)

  return (
    <PageContainer className="transitionNode enterFore exitFore">
      <SEO title={ title } />
      <Container>
        {documentToReactComponents(description.json, options)}

        <RandomWorkContainer>
          In the meantime, check this out: <InternalLink to={`/work/${randomWork.slug}`} pageType="Work">{randomWork.title}</InternalLink>
        </RandomWorkContainer>
        
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

    contentfulWorkList(contentful_id: {eq: "1p5V0NNEhIoZedN0PVNirR"}) {
      works {
        contentful_id
        title
        slug
      }
    }
  }
`;
