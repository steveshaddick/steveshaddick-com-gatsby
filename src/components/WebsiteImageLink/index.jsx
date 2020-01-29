import React from "react";
import PropTypes from "prop-types";

import {
  Component,
  ImgStyled,
  ImageOverlay,
  TextContainer,
  ArrowWrapper
} from "./styles";

import arrowIconSVG from "@images/arrow_right_alt-24px.svg";

/**
 * Component definition
 * @param {Props} props
 */
const WebsiteImageLink = ({ image, title, url }) => (
  <Component
    href={url}
    rel="noopener noreferrer"
    target="_blank"
    aria-label={`View ${title} website`}
  >
    <ImgStyled fluid={image.fluid} alt={image.title} />
    <ImageOverlay>
      <TextContainer>
        <span style={{ display: "inline-block" }}>Visit site</span>{" "}
        <ArrowWrapper>
          &nbsp;
          <img
            className="WebsiteImageLink_arrow1"
            src={arrowIconSVG}
            alt=""
          />{" "}
          <img className="WebsiteImageLink_arrow2" src={arrowIconSVG} alt="" />
        </ArrowWrapper>
      </TextContainer>
    </ImageOverlay>
  </Component>
);

WebsiteImageLink.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  url: PropTypes.string
};

WebsiteImageLink.defaultProps = {};

export default WebsiteImageLink;
