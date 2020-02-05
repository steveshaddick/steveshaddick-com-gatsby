import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";

import { getRandomWork } from "@utils/work-utils";
import "@utils/fragments.js";
import { renderJsonText } from "@utils/contentfulTextRenderer";

import SEO from "@components/SEO";
import WorksList from "@components/WorksList";
import PageContainer from "@components/PageContainer";

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
  const [randomWorks] = useState(() => getRandomWork(works, { num: 3 }));

  return (
    <PageContainer className={`transitionNode`}>
      <SEO title="Home" />
      <h1>Stuff by Steve Shaddick</h1>

      {renderJsonText(description.json)}

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
      ...workListFields
    }
  }
`;
