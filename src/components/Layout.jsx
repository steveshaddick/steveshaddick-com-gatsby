import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { TransitionPortal } from "gatsby-plugin-transition-link"

import Footer from '@components/Footer';

import "focus-visible"
import 'normalize.css';
import '@components/layout.css';

const Layout = ({ children }) => {

  return (
    <>
      <div>
        <main>{children}</main>
        <TransitionPortal>
          <Footer />
        </TransitionPortal>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
