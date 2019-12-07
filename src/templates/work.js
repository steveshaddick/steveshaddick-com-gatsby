import React from "react";
import { graphql } from "gatsby";
import { createClient } from 'contentful';
import styled from 'styled-components';
import { TransitionState } from "gatsby-plugin-transition-link"

import PageContainer from "@components/PageContainer"
import SEO from "@components/seo"
import Player from "@components/Player"
import WebsiteImageLink from "@components/WebsiteImageLink"
import WorkDetails from "@components/WorkDetails"
import NextWork from "@components/NextWork"

import { PALM } from "@global/constants"

/**
 * STYLES
 */

const DetailsContainer = styled.div`
  @media ${PALM} {
    padding-left: 15px;
    padding-right: 15px;
  }
`

const Container = styled.article`
  transition: all 1000ms ease-out;

  &.transitionOut {
    opacity: 0;
    transform: scale(0.25);
  }
`

/**
 * CODE
 */
const client = createClient({
  space: process.env.CF_SPACE_ID,
  accessToken: process.env.CF_ACCESS_TOKEN
});

class WorkPage extends React.Component {
  state = {
    loading: false,
    error: false,
    video: {
      id: "",
    },
    randomWork: null
  }

  constructor(props) {
    super()

    const {
      pageContext,
      data: { contentfulWorkList: { works } } 
    } = props

    const {
      contentful_id
    } = pageContext

    const filteredWorks = works.filter(work => work.contentful_id !== contentful_id)

    const randomIndex = Math.floor(Math.random() * filteredWorks.length)
    this.randomWork = filteredWorks[randomIndex]
  }

  componentDidMount() {
    this.fetchVideo()
  }

  fetchVideo() {
    this.setState({ loading: true });
    client
      .getEntry("eg9Kdh7zZqahCgCBCMC4k")
      .then((response) => {
        this.setState({
          video: {
            id: response.fields.work.fields.vimeoId
          }
        })
      })
      .catch(err => console.log(err));
  }

  render () {
    const {
      location,
      pageContext
    } = this.props

    const {
      title,
      type,
      image,
      url,
      loop,
      controls
    } = pageContext

    const currentSlug = location.pathname.replace('/work/', '')
    return (
      <TransitionState>
        {({ entry, exit }) => {
          let transitionClassName = ''
          if (entry.state.transitionType) {
            console.log('work using ENTRY', entry.state.transitionType)
            transitionClassName = entry.state.transitionType
          } else if (exit.state.transitionType) {
            console.log('work using EXIT', exit.state.transitionType)
            transitionClassName = exit.state.transitionType
          }

          return (
            <PageContainer className={`transitionNode ${transitionClassName}`}>
              <SEO title={ currentSlug } />

              <Container>
                {type === "Video" &&
                  <Player url={url} loop={loop} controls={controls}></Player>
                } 
                {type === "Website" &&
                  <WebsiteImageLink
                    image={image}
                    url={url}
                    title={title} 
                  />
                } 
                
                <DetailsContainer>
                  <WorkDetails nextWork={this.randomWork} {...pageContext} />
                </DetailsContainer>
              </Container>
            </PageContainer>
          )
        }}
      </TransitionState>
    );
  }
}

export default WorkPage

export const pageQuery = graphql`
  query {
    contentfulWorkList(contentful_id: {eq: "1p5V0NNEhIoZedN0PVNirR"}) {
      works {
        contentful_id
        title
        slug
        image {
          title
          description
          fluid(maxWidth: 100, quality: 75, toFormat: JPG) {           
            ...GatsbyContentfulFluid      
          } 
        }
      }
    }
  }
`
