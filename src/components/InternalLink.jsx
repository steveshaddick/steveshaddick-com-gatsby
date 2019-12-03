import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import TransitionLink from "gatsby-plugin-transition-link"

const StyledLink = styled(TransitionLink)`
  color: grey;
  text-decoration: none;
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
`;

const InternalLink = ({ to, children, onClick }) => (
  <StyledLink
    to={to}
    onClick={onClick}
    exit={{
      length: 1,
      trigger: ({ node, e, exit, entry }) => {
        console.log('this is the exit', node, e, exit, entry)
      }
    }}
    entry={{
      length: 1,
      trigger: ({ node, e, exit, entry }) =>{
        console.log('this is the ENTRY', node, e, exit, entry)
      }
    }}
    >{ children }</StyledLink>
)

InternalLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
}

InternalLink.defaultProps = {
}

export default InternalLink
