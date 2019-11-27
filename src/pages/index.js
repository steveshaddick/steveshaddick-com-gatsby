import React from "react";
import { Link, graphql } from "gatsby";
import axios from "axios";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

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
    console.log("FETCHING ...", `https://cdn.contentful.com/spaces/${process.env.CF_SPACE_ID}/environments/master/entries/eg9Kdh7zZqahCgCBCMC4k?access_token=${process.env.CF_ACCESS_TOKEN}`);
    axios
      .get(`https://cdn.contentful.com/spaces/${process.env.CF_SPACE_ID}/environments/master/entries/eg9Kdh7zZqahCgCBCMC4k?access_token=${process.env.CF_ACCESS_TOKEN}`)
      .then((video) => {
        console.log("RETURNED", video);
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }

  render () {
    return (
      <Layout>
        <SEO title="Home" />
        <div>Here we are</div>
      </Layout>
    );
  }
}

export default IndexPage;
