import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "styled-components";

import { getRandomWork } from "@utils/work-utils";

import SEO from "@components/SEO";
import WorksList from "@components/WorksList";
import PageContainer from "@components/PageContainer";

import storage from "local-storage-fallback";

/**
 * STYLES
 */
const WorkListHead = styled.h2`
  margin-top: 75px;
  border-bottom: 1px solid #ccc;
`;

/**
 * Page component definition
 * @param {Props} props
 */
const IndexPage = ({
  data: {
    contentfulPage: { title, description, image },
    contentfulWorkList: { works }
  }
}) => {
  useEffect(() => {
    let workViews = {};
    for (let i = 0, len = works.length; i < len; i++) {
      const work = works[i];
      let numViews = 0;
      if (Math.random() > 0.33) {
        numViews = Math.floor(Math.random() * 20);
      }
      workViews[work.contentful_id] = {
        id: work.contentful_id,
        views: numViews,
        lastUpdated: new Date()
      };
    }

    storage.setItem("workViews", JSON.stringify(workViews));
  }, [works]);

  const [randomWorks] = useState(() => getRandomWork(works, { num: 3 }));

  return (
    <PageContainer className={`transitionNode`}>
      <SEO title="Home" />
      <h1>Stuff by Steve Shaddick</h1>

      {documentToReactComponents(description.json)}

      <WorkListHead>Like these:</WorkListHead>
      <WorksList worksData={randomWorks} styleType="list" />
    </PageContainer>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object
};

export default IndexPage;

export const pageQuery = graphql`
  query($homePageId: String, $workListId: String) {
    contentfulPage(contentful_id: { eq: $homePageId }) {
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

    contentfulWorkList(contentful_id: { eq: $workListId }) {
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
        thumbnail {
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
