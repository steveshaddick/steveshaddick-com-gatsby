import React, { useState } from "react";
import PropTypes from "prop-types";

import { NextWorkStyled, Component } from "./styles";

/**
 * Component definition
 * @param {Props} props
 */
const NextWorkList = ({ works }) => {
  const [hasOver, setHasOver] = useState(false);

  const [renderedWorks] = useState(() => {
    return works.map(function(work) {
      return (
        <NextWorkStyled
          key={work.contentful_id}
          work={work}
          handleOnOver={() => setHasOver(true)}
          handleOnOut={() => setHasOver(false)}
        />
      );
    });
  }, [works]);

  const classes = hasOver ? "hasOver" : "";

  return <Component className={classes}>{renderedWorks}</Component>;
};

NextWorkList.propTypes = {
  works: PropTypes.array
};

NextWorkList.defaultProps = {};

export default NextWorkList;
