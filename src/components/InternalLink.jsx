import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link, graphql } from "gatsby";

import TransitionLink from "gatsby-plugin-transition-link"

const InternalLink = ({ className, to, children, onClick, pageType }) => {
  let entryState = {}
  let exitState = {}
  if (window._pageType !== pageType) {
    if (window._pageType === 'About') {
      entryState = {
        transitionType:'enterBack'
      }
    } else if (window._pageType === 'Work') {
      exitState = {
        transitionType: 'enterBack'
      }
    }
  }

  return (
    <TransitionLink
      className={className}
      to={to}
      onClick={onClick}
      exit={{
        length: 0.4,
        trigger: ({ node }) => {
          console.log('EXIT TRIGGER', window._pageType , pageType)
          if (window._pageType !== pageType) {
            if (window._pageType === 'Work') {
              console.log(node.querySelector('.transitionNode'))
              node.querySelector('.transitionNode').classList.add('exitFore')
            }
          }
        }
      }}
      entry={{
        length: 0,
        trigger: ({ node }) => {
          console.log('ENTRY TRIGGER', window._pageType , pageType)
          if (window._pageType !== pageType) {
            if (pageType === 'Work') {
              console.log(node.querySelector('.transitionNode'))
              node.querySelector('.transitionNode').classList.add('enterBack')
            }
          }
          window._pageType = pageType
        }
      }}
      >{ children }</TransitionLink>
  )}

InternalLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
}

InternalLink.defaultProps = {
}

export default InternalLink
