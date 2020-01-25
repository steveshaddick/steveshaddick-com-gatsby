import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby";
import { navigate } from "@reach/router";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { getRandomWork } from "@utils/work-utils"

import SEO from "../components/seo";
import NextWorkList from "@components/NextWorkList";
import WorksList from "@components/WorksList";
import PageContainer from "@components/PageContainer";

import storage from 'local-storage-fallback'

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

  useEffect(() => {
    let workViews = {}
    for (let i=0, len=works.length; i<len; i++) {
      const work = works[i];
      let numViews = 0;
      if (Math.random() > 0.33) {
        numViews = Math.floor(Math.random() * 20)
      }
      workViews[work.contentful_id] = {
        id: work.contentful_id,
        views: numViews,
        lastUpdated: new Date()
      }
    }

    storage.setItem('workViews', JSON.stringify(workViews))

  }, [works]);

  const [ randomWorks ] = useState(() => getRandomWork(works, {num: 3}))

  return (
    <PageContainer className={`transitionNode`}>
      <SEO title="Home" />
      <h1>Stuff by Steve Shaddick</h1>
      
      {documentToReactComponents(description.json)}
      
      <h2>
        Like these:
      </h2>
      {
        //<NextWorkList works={randomWorks} />
      }
      <WorksList worksData={randomWorks} styleType="list" />

    </PageContainer>
  );
}

IndexPage.propTypes = {
  data: PropTypes.object
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
        type
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

