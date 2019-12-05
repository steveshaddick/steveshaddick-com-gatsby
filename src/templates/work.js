import React from "react";
import { Link, graphql } from "gatsby";
import { createClient } from 'contentful';
import styled from 'styled-components';
import { TransitionState } from "gatsby-plugin-transition-link"

import InternalLink from "@components/InternalLink"

import PageContainer from "@components/PageContainer"
import SEO from "@components/seo"
import Player from "@components/Player"
import WebsiteImageLink from "@components/WebsiteImageLink"
import WorkDetails from "@components/WorkDetails"


const client = createClient({
  space: process.env.CF_SPACE_ID,
  accessToken: process.env.CF_ACCESS_TOKEN
});


const Container = styled.article`
  transition: all 1000ms ease-out;

  &.transitionOut {
    opacity: 0;
    transform: scale(0.25);
  }
`

class WorkPage extends React.Component {
  state = {
    loading: false,
    error: false,
    video: {
      id: "",
    },
  }

  componentDidMount() {
    this.fetchVideo()
  }

  fetchVideo() {
    this.setState({ loading: true });
    client
      .getEntry("eg9Kdh7zZqahCgCBCMC4k")
      .then((response) => {
        console.log("RETURNED", response);
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
      info,
      image,
      description,
      url
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
                  <Player url={url}></Player>
                } 
                {type === "Website" &&
                  <WebsiteImageLink
                    image={image}
                    url={url}
                    title={title} 
                  />
                } 

                <WorkDetails {...pageContext} />
                
                <InternalLink
                  to="/about"
                  pageType="About"
                  >About</InternalLink>
                <br />
                <InternalLink
                  to="/work/around-about"
                  pageType="Work"
                  >Around About</InternalLink>
                <br />
                <InternalLink
                  to="/work/dusk-lighting"
                  pageType="Work"
                  >Dusk Lighting</InternalLink>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
              </Container>
            </PageContainer>
          )
        }}
      </TransitionState>
    );
  }
}

export default WorkPage;
