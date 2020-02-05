import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";

import "@utils/fragments.js";
import { getRandomWork } from "@utils/work-utils";

import { renderJsonText } from "@utils/contentfulTextRenderer";

import SEO from "@components/SEO";
import PageContainer from "@components/PageContainer";
import WorksList from "@components/WorksList";

/**
 * STYLES
 */
const WorkListHead = styled.h2`
  margin-top: 75px;
  border-bottom: 1px solid #ccc;
`;

/**
 * CODE
 */
function setDuration() {
  let rndDuration = Math.random() * 60000 + 90000;
  document.querySelector(
    ".animateTitle"
  ).style.transition = `transform ${rndDuration}ms ease-in-out`;

  rndDuration = Math.random() * 60000 + 90000;
  document.querySelector(
    ".animateContent"
  ).style.transition = `transform ${rndDuration}ms ease-in-out`;

  rndDuration = Math.random() * 90000 + 90000;
  document.querySelector(
    ".animateListHead"
  ).style.transition = `transform ${rndDuration}ms ease-in-out`;

  rndDuration = Math.random() * 90000 + 90000;
  document.querySelector(
    ".animateList"
  ).style.transition = `transform ${rndDuration}ms ease-in-out`;
}

function startAnimation() {
  let rndScale = [-0.8 + Math.random() * 0.4, -0.8 + Math.random() * 0.4];
  let rndSkew = [-0.8 + Math.random() * 0.4, -0.8 + Math.random() * 0.4];
  let rndLowStop = Math.random() * 400 + 400;
  document.querySelector(
    ".animateTitle"
  ).style.transform = `matrix(${rndScale[0]},${rndSkew[1]},${rndSkew[0]},${rndScale[1]},0,${rndLowStop})`;

  rndScale = [-0.8 + Math.random() * 0.4, -0.8 + Math.random() * 0.4];
  rndSkew = [-0.8 + Math.random() * 0.4, -0.8 + Math.random() * 0.4];
  rndLowStop = Math.random() * 400 + 400;
  document.querySelector(
    ".animateContent"
  ).style.transform = `matrix(${rndScale[0]},${rndSkew[1]},${rndSkew[0]},${rndScale[1]},0,${rndLowStop})`;

  rndScale = [-0.8 + Math.random() * 0.4, -0.8 + Math.random() * 0.4];
  rndSkew = [-0.8 + Math.random() * 0.4, -0.8 + Math.random() * 0.4];
  rndLowStop = Math.random() * 400 + 400;
  document.querySelector(
    ".animateListHead"
  ).style.transform = `matrix(${rndScale[0]},${rndSkew[1]},${rndSkew[0]},${rndScale[1]},0,${rndLowStop})`;

  rndScale = [-0.05 + Math.random() * 0.1, -0.05 + Math.random() * 0.1];
  rndSkew = [-0.05 + Math.random() * 0.1, -0.05 + Math.random() * 0.1];
  rndLowStop = Math.random() * 400 + 400;
  document.querySelector(
    ".animateList"
  ).style.transform = `matrix(${rndScale[0]},${rndSkew[1]},${rndSkew[0]},${rndScale[1]},0,${rndLowStop})`;
}

/**
 * Page Component definition
 */
const NotFoundPage = ({
  data: {
    contentfulPage: { title, description, image },
    contentfulWorkList: { works }
  }
}) => {
  useEffect(() => {
    document.body.classList.add("dark");
    setDuration();
    setTimeout(startAnimation, 5);

    return function cleanup() {
      document.body.classList.remove("dark");
    };
  }, []);

  const [randomWorks] = useState(() => getRandomWork(works, { num: 3 }));

  return (
    <PageContainer>
      <SEO title="404: Not found" />
      <h1
        className="animateTitle"
        style={{ transform: "matrix(0,0,0,0,0,0,0)" }}
      >
        {title}
      </h1>

      <div
        className="animateContent"
        style={{ transform: "matrix(0,0,0,0,0,0,0)" }}
      >
        {renderJsonText(description.json)}
      </div>

      <WorkListHead
        className="animateListHead"
        style={{ transform: "matrix(0,0,0,0,0,0,0)" }}
      >
        Go here instead:
      </WorkListHead>
      <WorksList
        className="animateList"
        style={{ transform: "matrix(0,0,0,0,0,0,0)" }}
        worksData={randomWorks}
        styleType="list"
      />
    </PageContainer>
  );
};

NotFoundPage.propTypes = {
  data: PropTypes.object
};

export default NotFoundPage;

export const pageQuery = graphql`
  query($notFoundPageId: String, $workListId: String) {
    contentfulPage(contentful_id: { eq: $notFoundPageId }) {
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
      ...workListFields
    }
  }
`;
