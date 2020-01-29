import React from "react";
import PropTypes from "prop-types";
import { TransitionPortal } from "gatsby-plugin-transition-link";

import Footer from "./Footer";

import "normalize.css";
import "./styles.css";
import "focus-visible";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div>
        <main>{children}</main>
        <TransitionPortal>
          <Footer />
        </TransitionPortal>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DefaultLayout;
