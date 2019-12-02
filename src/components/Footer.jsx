import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components';

import WorksList from "@components/WorksList";

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

const Component = styled.div`
  width: 100%;
  position: fixed;
  top: 100vh;

  /*transition: top 200ms ease-in;*/

  footer {
    width: 100%;
    background: white;
    padding: 15px 0;
    position: sticky;
    top: 0;
  }

  &.expanded {
    top: 0 !important;
    overflow: auto;
    transition: top 200ms ease-out;

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

    return (
      <Component className={componentClassList} ref={this.refComponent}>
        <Container>
          <footer ref={this.refFooter}>
            <nav role="navigation">
              <Link to="/">Steve Shaddick</Link>
              <Link to="/about" onClick={() => this.collapseFooter()}>About</Link>
              <button onClick={() => this.expandFooter()}>Work</button>
              <button onClick={() => this.collapseFooter()}>Close</button>
            </nav>
          </footer>

          <WorksListContainer>
            <WorksList />
          </WorksListContainer>

        </Container>
      </Component>
    )
  }
}

export default Footer;
