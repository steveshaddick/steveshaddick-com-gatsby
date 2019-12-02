import React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import { createClient } from 'contentful';
import styled from 'styled-components';

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Player from "../components/Player";

const client = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CF_SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CF_ACCESS_TOKEN
});

const Container = styled.div`
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
    } = this.props;

    console.log(pageContext);

    const currentSlug = location.pathname.replace('/work/', '')
    return (
      <Layout>
        <SEO title={ currentSlug } />

        <Container className="transitionNode enterBack">
          <div>Here we are { currentSlug }</div>
          <Player url={pageContext.url}></Player>
          <TransitionLink
            to="/about"
            exit={{
              length: 1,
              trigger: ({ node, e, exit, entry }) => {
                console.log('this is the exit', node, e, exit, entry)
              }
            }}
            entry={{
              length: 0,
              trigger: ({ node, e, exit, entry }) =>{
                console.log('this is the ENTRY', node, e, exit, entry)
              }
            }}
            >About</TransitionLink>
        </Container>
      </Layout>
    );
  }
}

export default WorkPage;
