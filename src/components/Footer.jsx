import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"
import FocusLock from 'react-focus-lock'

import WorksList from "@components/WorksList";
import SignatureLink from "@components/SignatureLink"
import InternalLink from "@components/InternalLink"
import Spinner from "@components/Spinner"

import { PALM } from "@global/constants"

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
  opacity: 0.85;
  transition: opacity 266ms ease-in-out;
  padding-left: 20px;
  padding-right: 20px;

  &.focus-within,
  &:hover {
    opacity: 1;
  }

  a,
  button {
    color: grey;
    border: none;
    cursor: pointer;
    line-height: 2.4rem;
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

  @media ${PALM} {
    padding-left: 15px;
    padding-right: 15px;
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
  top: auto;
  bottom: 0;
  transition: top 266ms cubic-bezier(0.86, 0, 0.07, 1), box-shadow 700ms linear;
  background-color: white;
  box-shadow: rgba(100,100,100,0) 1px 1px 10px 1px;
  border-top: 1px solid rgb(220, 220, 200, 0.5);

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
      min-height: 100vh;
    }

    ${BarComponent} {
      background: rgba(250,250,250,0.95);
      box-shadow: rgba(50,50,50,0.25) 0px 1px 20px 1px;
      z-index: 10000;
      opacity: 0.95;
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

    this.onComponentTransitionEnd = this.onComponentTransitionEnd.bind(this)
    this.onKeyPressed = this.onKeyPressed.bind(this)

    this.refFooter = React.createRef();
    this.refComponent = React.createRef();
    this.refListContainer = React.createRef()
  }

  expandFooter () {
    this.refComponent.current.style.top = `calc(100vh - ${this.refFooter.current.offsetHeight}px)`

    setTimeout(() => {
      this.loadListTimeout = setTimeout(() => {
        this.setState({
          loadList: true
        })
      }, 500)

      this.setState({
        isExpanded: true,
      })

      disableBodyScroll(this.refListContainer.current)
    }, 10);
  }

  collapseFooter () {
    this.setState({
      isExpanded: false,
      loadList: false
    });

  }

  onComponentTransitionEnd (e) {
    const { isExpanded } = this.state
    
    if (e.target === this.refComponent.current) {
      if (e.propertyName === 'top') {
        if (!isExpanded) {
          this.refComponent.current.style.top = ''
          enableBodyScroll(this.refListContainer.current)
        }
      }
    }
  }

  onKeyPressed(e) {
    const { isExpanded } = this.state;
    if (isExpanded) {
      if (e.keyCode === 27) {
        this.collapseFooter()
      }
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.loadListTimeout = null
    clearAllBodyScrollLocks()
  }

  render () {

    const { isExpanded, loadList } = this.state;
    const componentClassList = isExpanded ? 'expanded' : '';

    return (
      <Component
        className={componentClassList}
        ref={this.refComponent}
        onTransitionEnd={this.onComponentTransitionEnd}
      >
        <FocusLock disabled={!isExpanded}>
          <Container onKeyDown={this.onKeyPressed}>
            <BarComponent>
              <BarContainer ref={this.refFooter}>
                <SignatureLink />
                <Nav role="navigation">
                  <StyledLink to="/about" type="About" onClick={() => this.collapseFooter()}>About</StyledLink>
                  {!isExpanded &&
                    <FakeLink onClick={() => this.expandFooter()}>Work</FakeLink>
                  }
                  {isExpanded &&
                    <FakeLink onClick={() => this.collapseFooter()}>Close</FakeLink>
                  }
                </Nav>
              </BarContainer>
            </BarComponent>

            <WorksListContainer ref={this.refListContainer}>
              {(isExpanded && !loadList) &&
                <Spinner />
              }
              {loadList &&
                <WorksList onClick={() => this.collapseFooter()} needFocus={true} />
              }
            </WorksListContainer>

          </Container>
        </FocusLock>
      </Component>
    )
  }
}

export default Footer;
