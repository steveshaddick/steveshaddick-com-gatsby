import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import { navigate } from "@reach/router";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import SEO from "../components/seo";
import NextWork from "@components/NextWork";
import PageContainer from "@components/PageContainer";

const IndexPage = ({
  data: {
    contentfulPage: { 
      title, description, image 
    }, 
    contentfulWorkList: {
      works
    } 
  } 
}) => {

  const [randomIndex] = useState(Math.floor(Math.random() * works.length))
  const randomWork = works[randomIndex]

  return (
    <PageContainer className={`transitionNode`}>
      <SEO title="Home" />
      <h1>Stuff by Steve Shaddick</h1>
      
      {documentToReactComponents(description.json)}
      
      <h2>
        Like this:
      </h2>
      <NextWork work={randomWork} />
      <NextWork work={randomWork} />
    </PageContainer>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    contentfulPage(contentful_id: {eq: "4xRYqvVFcSxwFv9OAgEfW"}) {
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
        image {
          title
          description
          fluid(maxWidth: 150, quality: 75, toFormat: JPG) {           
            ...GatsbyContentfulFluid      
          } 
        }
      }
    }
  }
`;

