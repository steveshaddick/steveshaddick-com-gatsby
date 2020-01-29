import React from "react";
import PropTypes from "prop-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import WorksList from "@components/WorksList";

import {
  Component,
  Info,
  UnderBarContainer,
  Title,
  TitleInfoContainer,
  Description,
  NextWorkContainer
} from "./styles";

/**
 * Component definition
 * @param {Props} props
 */
const WorkDetails = ({ title, type, info, description, url, nextWorks }) => {
  let infoBits = [];
  if (type === "Website") {
    const displayUrl = url.replace("http://", "").replace("https://", "");
    if (url.indexOf("http") !== 0) {
      url = `http://${url}`;
    }
    infoBits.push(
      <a
        key={"WorkDetails_url"}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {displayUrl}
      </a>
    );
  }
  if (info) {
    infoBits.push(<span key={"WorkDetails_info"}>{info}</span>);
  }

  if (!infoBits.length) {
    infoBits.push("");
  }

  return (
    <Component>
      <UnderBarContainer>
        <TitleInfoContainer>
          <Title>{title}</Title>
          <Info>{infoBits.reduce((prev, curr) => [prev, " ", curr])}</Info>
        </TitleInfoContainer>
      </UnderBarContainer>

      {description && (
        <Description>{documentToReactComponents(description.json)}</Description>
      )}
      <NextWorkContainer>
        <h2>Next Up</h2>
        <WorksList worksData={nextWorks} styleType="list" />
      </NextWorkContainer>
    </Component>
  );
};

WorkDetails.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  info: PropTypes.string,
  description: PropTypes.object,
  nextWork: PropTypes.object,
  url: PropTypes.string,
  nextWorks: PropTypes.array
};

WorkDetails.defaultProps = {};

export default React.memo(WorkDetails);
