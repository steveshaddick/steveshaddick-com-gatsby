import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";

import PageContainer from "@components/PageContainer";
import InternalLink from "@components/InternalLink";
import SEO from "@components/SEO";
import ImageClicker from "@components/ImageClicker";

import { renderJsonText } from "@utils/contentfulTextRenderer";

import { MID_TABLET } from "@global/constants";

/**
 * STYLES
 */

const RandomWorkContainer = styled.div``;

const ImagesContainer = styled.div`
  width: 25%;

  @media ${MID_TABLET} {
    width: 100%;
  }
`;

const TextContainer = styled.div`
  width: 75%;
  padding-left: 25px;

  @media ${MID_TABLET} {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;

  @media ${MID_TABLET} {
    display: block;
  }
`;

/**
 * CODE
 */

const AboutPage = ({
  data: {
    contentfulPage: { title, description, image },
    contentfulWorkList: { works }
  }
}) => {
  const [randomIndex] = useState(Math.floor(Math.random() * works.length));
  const randomWork = works[randomIndex];

  return (
    <PageContainer className="transitionNode enterFore exitFore">
      <SEO title={title} />
      <Container>
        <ImagesContainer>
          <ImageClicker images={image} />
        </ImagesContainer>
        <TextContainer>
          {renderJsonText(description.json)}

          <RandomWorkContainer>
            In the meantime, check this out:{" "}
            <InternalLink to={`/work/${randomWork.slug}`} pageType="Work">
              {randomWork.title}
            </InternalLink>
          </RandomWorkContainer>
        </TextContainer>
      </Container>
    </PageContainer>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object
};

export default AboutPage;

export const pageQuery = graphql`
  query($aboutPageId: String, $workListId: String) {
    contentfulPage(contentful_id: { eq: $aboutPageId }) {
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
        slug
      }
    }
  }
`;
