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
`;

const WorksListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  max-height: 0;
  overflow: hidden;

  transition: max-height 300ms ease-out;
`;

const BarContainer = styled.div`
  padding: 5px 0;
  margin: 0 auto;
  max-width: 1200px;

  display: flex;
  justify-content: space-between;
`

const BarComponent = styled.div`
  width: 100%;
  position: sticky;
  top: 0;

  a,
  button {
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
  }
`

const Nav = styled.nav`
  display: flex;

  > * {
    margin: auto 10px;
  }
`

const StyledLink = styled(InternalLink)`
`;

const FakeLink = styled.button`
`

const Component = styled.div`
  width: 100%;
  position: fixed;
  top: 100vh;
  transition: top 266ms cubic-bezier(0.86, 0, 0.07, 1), box-shadow 700ms linear;
  background-color: white;
  box-shadow: rgba(100,100,100,0) 1px 1px 10px 1px;
  border-top: 1px solid rgb(220, 220, 200, 0.5);

  /*transition: top 200ms ease-in;*/

  &:focus-within,
  &:hover {
    box-shadow: rgba(100,100,100,0.1) 1px 1px 10px 1px;
  }

  &.expanded {
    top: 0 !important;
    overflow: auto;
    background-color: #FAFAFA;
    height: 100vh;

    ${Container} {
    }

    ${BarComponent} {
      background: rgba(250,250,250,0.95);
      box-shadow: rgba(50,50,50,0.25) 0px 1px 20px 1px;
      z-index: 1000;
    }

    ${WorksListContainer} {
      max-height: 100000000px;
      overflow: visible;
      background-color: #FAFAFA;
    }
  }
`;

/**
 * CODE
 */

class Footer extends React.Component {
  state = {
    isExpanded: false,
    loadList: false
  };

  constructor () {
    super();

    this.loadListTimeout = null

    this.refFooter = React.createRef();
    this.refComponent = React.createRef();
  }

  expandFooter () {
    this.refComponent.current.style.top = `calc(100vh - ${this.refFooter.current.offsetHeight}px)`;

    this.loadListTimeout = setTimeout(() => {
      this.setState({
        loadList: true
      })
    }, 500)

    this.setState({
      isExpanded: true,
    });
  }

  collapseFooter () {
    this.setState({
      isExpanded: false,
      loadList: false
    });

  }

  componentDidMount() {
    setTimeout(() => {
      this.refComponent.current.style.top = `calc(100vh - ${this.refFooter.current.offsetHeight}px)`;
    }, 1000);
  }

  componentWillUnmount() {
    this.loadListTimeout = null
  }

  render () {

    const { isExpanded, loadList } = this.state;
    const componentClassList = isExpanded ? 'expanded' : '';

    return (
      <Component className={componentClassList} ref={this.refComponent}>
        <Container>
          <BarComponent>
            <BarContainer ref={this.refFooter}>
              <SignatureLink />
              <Nav role="navigation">
                <StyledLink to="/about">About</StyledLink>
                {!isExpanded &&
                  <FakeLink onClick={() => this.expandFooter()}>Work</FakeLink>
                }
                {isExpanded &&
                  <FakeLink onClick={() => this.collapseFooter()}>Close</FakeLink>
                }
              </Nav>
            </BarContainer>
          </BarComponent>

          <WorksListContainer>
            {loadList &&
              <WorksList onClick={() => this.collapseFooter()} />
            }
          </WorksListContainer>

        </Container>
      </Component>
    )
  }
}

export default Footer;
