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

class IndexPage extends React.Component {
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

    return (
      <Layout>
        <SEO title="Home" />
        <Player videoId={this.state.video.id}></Player>
      </Layout>
    );
  }
}

export default IndexPage;

