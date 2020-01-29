import React from "react";
import PropTypes from "prop-types";

import TransitionLink from "gatsby-plugin-transition-link";

/**
 * getPageType
 * @param {String} url
 */
function getPageType(url) {
  // pretty simple at the moment...
  return url === "/about" ? "About" : "Work";
}

/**
 * Component definition
 * @param {Props} props
 */
const InternalLink = ({ className, to, children, onClick }) => {
  const pageType = getPageType(to);

  return (
    <TransitionLink
      className={className}
      to={to}
      onClick={onClick}
      exit={{
        length: 0.5,
        trigger: ({ node }) => {
          if (window._pageType !== pageType) {
            if (window._pageType === "Work") {
              node.querySelector(".transitionNode").classList.add("exitFore");
            }
          }
        }
      }}
      entry={{
        length: 0,
        trigger: ({ node }) => {
          if (window._pageType !== pageType) {
            if (pageType === "Work") {
              node.querySelector(".transitionNode").classList.add("enterBack");
            }
          }
          window._pageType = pageType;
        }
      }}
    >
      {children}
    </TransitionLink>
  );
};

InternalLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};

InternalLink.defaultProps = {};

export default InternalLink;
