import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "styled-components";
import { BLOCKS } from "@contentful/rich-text-types";
import Img from "gatsby-image";

import PageContainer from "@components/PageContainer";
import InternalLink from "@components/InternalLink";
import SEO from "@components/SEO";
import ImageClicker from "@components/ImageClicker";

import { MID_TABLET } from "@global/constants";

/**
 * STYLES
 */

const RandomWorkContainer = styled.div``;

const StyledImg = styled(Img)`
  margin: 16px 0;
`;

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

const options = {
  renderNode: {
    // eslint-disable-next-line react/display-name
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const {
        data: {
          target: { fields }
        }
      } = node;
      const {
        title,
        file: {
          "en-CA": { url, details }
        }
      } = fields;
      const {
        image: { height, width }
      } = details;

      const imagedata = {
        aspectRatio: width / height,
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
      };
      return <StyledImg fluid={imagedata} alt={title["en-CA"]} />;
    }
  }
};

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
          {documentToReactComponents(description.json, options)}

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
