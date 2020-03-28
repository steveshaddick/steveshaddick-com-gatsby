import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import { TransitionState } from "gatsby-plugin-transition-link";
import Img from "gatsby-image";

import { updateWorkView, getRandomWork } from "@utils/work-utils";

import PageContainer from "@components/PageContainer";
import SEO from "@components/SEO";
import Player from "@components/Player";
import WorkDetails from "@components/WorkDetails";

import { PALM, MID_TABLET } from "@global/constants";

/**
 * STYLES
 */

const MediaContainer = styled.div`
  width: 80%;

  @media ${MID_TABLET} {
    width: 100%;
  }
`;

const DetailsContainer = styled.div`
  @media ${PALM} {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const Container = styled.article`
  transition: all 1000ms ease-out;

  &.transitionOut {
    opacity: 0;
    transform: scale(0.25);
  }
`;

/**
 * CODE
 */

class WorkPage extends React.Component {
  state = {
    loading: false,
    error: false,
    video: {
      id: ""
    },
    randomWork: null
  };

  constructor(props) {
    super();

    const {
      pageContext,
      data: {
        contentfulWorkList: { works }
      }
    } = props;

    const { contentful_id } = pageContext;

    updateWorkView(contentful_id);

    this.randomWorks = getRandomWork(works, {
      num: 3,
      excludeContentfulIds: [contentful_id]
    });
  }

  componentDidMount() {
    this.fetchVideo();
  }

  fetchVideo() {
    this.setState({ loading: true });
  }

  render() {
    const { pageContext } = this.props;

    const {
      title,
      type,
      image,
      url,
      loop,
      metaDescription,
      controls
    } = pageContext;

    const seoDescription = metaDescription
      ? metaDescription
      : `A ${type.toLowerCase()} work.`;

    const seoImage = image ? `https:${image.fluid.src}` : null;

    return (
      <TransitionState>
        {({ entry, exit }) => {
          let transitionClassName = "";
          if (entry.state.transitionType) {
            console.log("work using ENTRY", entry.state.transitionType);
            transitionClassName = entry.state.transitionType;
          } else if (exit.state.transitionType) {
            console.log("work using EXIT", exit.state.transitionType);
            transitionClassName = exit.state.transitionType;
          }

          return (
            <PageContainer className={`transitionNode ${transitionClassName}`}>
              <SEO
                title={title}
                description={seoDescription}
                imageUrl={seoImage}
              />

              <Container>
                <MediaContainer>
                  {type === "Video" && (
                    <Player url={url} loop={loop} controls={controls}></Player>
                  )}
                  {type === "Website" && (
                    <Img fluid={image.fluid} alt={image.title} />
                  )}
                </MediaContainer>

                <DetailsContainer>
                  <WorkDetails nextWorks={this.randomWorks} {...pageContext} />
                </DetailsContainer>
              </Container>
            </PageContainer>
          );
        }}
      </TransitionState>
    );
  }
}

WorkPage.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object
};

export default WorkPage;

export const pageQuery = graphql`
  query($workListId: String) {
    contentfulWorkList(contentful_id: { eq: $workListId }) {
      works {
        contentful_id
        title
        slug
        type
        metaDescription
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
