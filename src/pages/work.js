import React from "react";
import { Link, graphql } from "gatsby";
import { createClient } from 'contentful';

import Layout from "../components/Layout";
import Image from "../components/image";
import SEO from "../components/seo";
import Player from "../components/Player";
import WorksList from "../components/WorksList";

const client = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.CF_SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.CF_ACCESS_TOKEN
});

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
      data: { contentfulWorkList: { works } },
      location,
      pageContext
    } = this.props;

    console.log(pageContext);

    const currentSlug = location.pathname.replace('/work/', '')

    console.log(location, works);
    return (
      <Layout>
        <SEO title={ currentSlug } />
        <div>Here we are { currentSlug }</div>
        <Player url={pageContext.url}></Player>
        <WorksList works={works} />
      </Layout>
    );
  }
}

export default WorkPage;

export const pageQuery = graphql`
  query {
    contentfulWorkList(contentful_id: {eq: "1p5V0NNEhIoZedN0PVNirR"}) {
      works {
        contentful_id
        title
        slug
        type
        image {
          title
          url
        }
        thumbnail {
          title
          url
        }
        info
        url
        description {
          json
        }
      }
    }
  }
`;
