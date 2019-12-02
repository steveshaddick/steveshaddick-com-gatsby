import React, { useEffect } from "react";
import { Link, graphql } from "gatsby";
import { navigate } from "@reach/router";

import Layout from "../components/Layout";
import SEO from "../components/seo";

function chooseRandomWork(works) {
  const videoWorks = works.filter(work => work.type === "Video");
  const randomIndex = Math.floor(Math.random() * videoWorks.length);
  const work = videoWorks[randomIndex];

  navigate(`/work/${work.slug}`, { replace: true });
}

const IndexPage = ({ data: { contentfulWorkList: { works } } }) => {

  useEffect(() => chooseRandomWork(works), []);

  return (
    <Layout>
      <SEO title="Home" />
    </Layout>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    contentfulWorkList(contentful_id: {eq: "1p5V0NNEhIoZedN0PVNirR"}) {
      works {
        contentful_id
        slug
        type
      }
    }
  }
`;

