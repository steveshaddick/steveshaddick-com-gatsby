import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'

import WorksList from "@components/WorksList";
import SignatureLink from "@components/SignatureLink"
import InternalLink from "@components/InternalLink"

/**
 * STYLES
 */
const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const WorksListContainer = styled.div`
  width: 100%;
  background: white;
  max-height: 0;
  overflow: hidden;

  transition: max-height 300ms ease-out;
`;

const BarContainer = styled.div`
  width: 100%;
  padding: 5px 0;
  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
`

const Nav = styled.nav`
  display: flex;

  > * {
    margin: auto 10px;
  }
`

const FakeLink = styled.button`
  color: grey;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  background: transparent;
  background-image: linear-gradient(#8CA6B4, #8CA6B4);
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 0 2px;
  opacity: 0.7;

  transition: background-size 133ms ease-in-out, opacity 266ms ease-out;

  &.focus-visible,
  &:hover {
    background-size: 100% 2px;
    opacity: 1;
  }
`

const Component = styled.div`
  width: 100%;
  position: fixed;
  top: 100vh;
  transition: top 266ms cubic-bezier(0.86, 0, 0.07, 1), background-color 1000ms linear;
  background-color: white;

  /*transition: top 200ms ease-in;*/

  &:focus-within,
  &:hover {
    background-color: #FAFAFA;
  }

  &.expanded {
    top: 0 !important;
    overflow: auto;
    background-color: #FAFAFA;

    ${Container} {
      height: 100%;
      overflow: auto;
    }

    ${WorksListContainer} {
      max-height: 100000000px;
      overflow: auto;
    }
  }
`;

/**
 * CODE
 */

class Footer extends React.Component {
  state = {
    isExpanded: false
  };

  constructor () {
    super();

    this.refFooter = React.createRef();
    this.refComponent = React.createRef();
  }

  expandFooter () {
    this.refComponent.current.style.top = `calc(100vh - ${this.refFooter.current.offsetHeight}px)`;

    this.setState({
      isExpanded: true,
    });
  }

  collapseFooter () {
    this.setState({
      isExpanded: false,
    });

  }

  componentDidMount() {
    console.log('MOUNT', this.refFooter.current.offsetHeight);
    setTimeout(() => {
      this.refComponent.current.style.top = `calc(100vh - ${this.refFooter.current.offsetHeight}px)`;
    }, 1000);
  }

  render () {

    const { isExpanded } = this.state;
    const componentClassList = isExpanded ? 'expanded' : '';

    console.log('FOOTER PROPS', this.props);

    return (
      <Component className={componentClassList} ref={this.refComponent}>
        <Container>
          <BarContainer ref={this.refFooter}>
            <SignatureLink />
            <Nav role="navigation">
              <InternalLink to="/about">About</InternalLink>
              {!isExpanded &&
                <FakeLink onClick={() => this.expandFooter()}>Work</FakeLink>
              }
              {isExpanded &&
                <FakeLink onClick={() => this.collapseFooter()}>Close</FakeLink>
              }
            </Nav>
          </BarContainer>

          <WorksListContainer>
            <WorksList onClick={() => this.collapseFooter()} />
          </WorksListContainer>

        </Container>
      </Component>
    )
  }
}

export default Footer;
