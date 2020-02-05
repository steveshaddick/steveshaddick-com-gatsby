import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import styled from "styled-components";
import Img from "gatsby-image";

const StyledImg = styled(Img)`
  margin: 16px 0;
`;

export const renderJsonText = json => {
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

  return documentToReactComponents(json, options);
};
