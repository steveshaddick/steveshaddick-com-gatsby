import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled from 'styled-components';
import { BLOCKS } from '@contentful/rich-text-types'

import Img from "gatsby-image"

import PageContainer from "@components/PageContainer"
import InternalLink from "@components/InternalLink"
import SEO from "../components/seo"

const RandomWorkContainer = styled.div`
`

const StyledImg = styled(Img)`
  margin: 16px 0;
`

const ImagesContainer = styled.div`
  width: 25%;
`

const TextContainer = styled.div`
  width: 75%;
  padding-left: 25px;
`

const Container = styled.div`
  padding-top: 50px;
  display: flex;
  min-height: 100vh;
`

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { data: { target: { fields }}} = node
      const { title, file: { "en-CA": { url, details }}} = fields
      const { image: {height, width }} = details

      const imagedata = {
        aspectRatio: width/height,
        sizes: "(max-width: 500px) 100vw, 500px",
        src: `${url}?w=500&q=75&fm=jpg`,
        srcSet: `
          ${url}?w=125&h=94&q=75&fm=jpg 125w,
          ${url}?w=250&h=188&q=75&fm=jpg 250w,
          ${url}?w=500&h=375&q=75&fm=jpg 500w,
          ${url}?w=750&h=563&q=75&fm=jpg 750w,
          ${url}?w=1000&h=751&q=75&fm=jpg 1000w,
          ${url}?w=1500&h=1126&q=75&fm=jpg 1500w
        `
      }
      return <StyledImg fluid={imagedata} alt={title['en-CA']} />
    }
  }
};

function renderImages(image, index) {
  return <StyledImg key={index} fluid={image.fluid} alt={image.title} />
}

const AboutPage = ({ data: { contentfulPage: { title, description, image }, contentfulWorkList: { works } } }) => {

  const [randomIndex] = useState(Math.floor(Math.random() * works.length))
  const randomWork = works[randomIndex]

  const renderedImaged = image.map(renderImages)

  console.log(description)

  return (
    <PageContainer className="transitionNode enterFore exitFore">
      <SEO title={ title } />
      <Container>
        <ImagesContainer>
          {renderedImaged}
        </ImagesContainer>
        <TextContainer>
          {documentToReactComponents(description.json, options)}

          <RandomWorkContainer>
            In the meantime, check this out: <InternalLink to={`/work/${randomWork.slug}`} pageType="Work">{randomWork.title}</InternalLink>
          </RandomWorkContainer>
        </TextContainer>
        
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
      image {
        title
        description
        fluid(maxWidth: 500, quality: 75, toFormat: JPG) {           
          ...GatsbyContentfulFluid      
        } 
      }
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
