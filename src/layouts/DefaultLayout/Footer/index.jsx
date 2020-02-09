import React from "react";

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";
import FocusLock from "react-focus-lock";

import WorksList from "@components/WorksList";
import SignatureLink from "@components/SignatureLink";
import Spinner from "@components/Spinner";

import {
  Component,
  Container,
  WorksListContainer,
  InternalLinkStyled,
  BarComponent,
  BarContainer,
  Nav,
  FakeLink
} from "./styles";

/**
 * Class definition
 */
class Footer extends React.Component {
  state = {
    isExpanded: false,
    loadList: false
  };

  constructor() {
    super();

    this.loadListTimeout = null;

    this.onComponentTransitionEnd = this.onComponentTransitionEnd.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);

    this.refFooter = React.createRef();
    this.refComponent = React.createRef();
    this.refListContainer = React.createRef();
  }

  /**
   * Expand the footer
   */
  expandFooter() {
    this.refComponent.current.style.top = `calc(100vh - ${this.refFooter.current.offsetHeight}px)`;

    setTimeout(() => {
      this.loadListTimeout = setTimeout(() => {
        this.setState({
          loadList: true
        });
      }, 500);

      this.setState({
        isExpanded: true
      });

      disableBodyScroll(this.refListContainer.current);
    }, 10);
  }

  /**
   * Collapse the footer
   */
  collapseFooter() {
    this.setState({
      isExpanded: false,
      loadList: false
    });
  }

  /**
   * Transition end handler
   * @param {SyntheticEvent} e
   */
  onComponentTransitionEnd(e) {
    const { isExpanded } = this.state;

    if (e.target === this.refComponent.current) {
      if (e.propertyName === "top") {
        if (!isExpanded) {
          this.refComponent.current.style.top = "";
          enableBodyScroll(this.refListContainer.current);
        }
      }
    }
  }

  /**
   * Key pressed handler
   * @param {SyntheticEvent} e
   */
  onKeyPressed(e) {
    const { isExpanded } = this.state;
    if (isExpanded) {
      if (e.keyCode === 27) {
        this.collapseFooter();
      }
    }
  }

  /**
   * Component unmount
   */
  componentWillUnmount() {
    this.loadListTimeout = null;
    clearAllBodyScrollLocks();
  }

  /**
   * Render
   */
  render() {
    const { isExpanded, loadList } = this.state;
    const componentClassList = isExpanded ? "expanded" : "";

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
                  <InternalLinkStyled
                    to="/about"
                    type="About"
                    onClick={() => this.collapseFooter()}
                  >
                    About
                  </InternalLinkStyled>
                  {!isExpanded && (
                    <FakeLink onClick={() => this.expandFooter()}>
                      Work
                    </FakeLink>
                  )}
                  {isExpanded && (
                    <FakeLink onClick={() => this.collapseFooter()}>
                      Close
                    </FakeLink>
                  )}
                </Nav>
              </BarContainer>
            </BarComponent>

            <WorksListContainer ref={this.refListContainer}>
              {isExpanded && !loadList && <Spinner />}
              {loadList && (
                <WorksList
                  onClick={() => this.collapseFooter()}
                  needFocus={true}
                />
              )}
            </WorksListContainer>
          </Container>
        </FocusLock>
      </Component>
    );
  }
}

export default Footer;