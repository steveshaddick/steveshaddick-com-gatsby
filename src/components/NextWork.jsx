import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Img from "gatsby-image"
import InternalLink from "@components/InternalLink"

import { MID_TABLET, BELOW_TABLET } from "@global/constants"

const NextWorkImage = styled(Img)`
  width: 75px;
  height: 75px;
  transition: box-shadow 266ms ease-in-out;
  box-shadow: rgba(50,50,50,0) 0px 1px 20px 1px;

  @media ${BELOW_TABLET} {
    width: 50px;
    height: 50px;
  }
`

const Text = styled.span`
  opacity: 0;
  padding: 0 15px;
  transform: translate3d(-10px, 0, 0);
  transition: opacity 266ms ease-in-out, transform 266ms ease-in-out;
  position: absolute;
  left: 75px;
  width: 200px;
  background: #fff;
  pointer-events: none;

  @media (hover: none), ${MID_TABLET} {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const StyledLink = styled(InternalLink)`
  display: flex;
  align-items: center;
  transition: opacity 266ms ease-in-out;

  &:hover,
  &.focus-visible {
    opacity: 1;

    ${Text} {
      opacity: 1;
      transform: translate3d(0px, 0, 0);
    }

    ${NextWorkImage} {
      box-shadow: rgba(100,100,100,0.25) 0px 1px 10px 1px;
    }

  }
`

const Component = styled.div`
  position: relative;
  display: inline-block;
`

const NextWork = ({ className, work, handleOnOver, handleOnOut }) => {
  const {
    title,
    image,
    slug
  } = work

  const [ isActive, setActive ] = useState(false)
  const classes = isActive ? `${className} active` : className

  return (
    <Component
      className={classes}
      onMouseOver={() => {
        setActive(true)
        if (handleOnOver) handleOnOver()
      }}
      onMouseOut={() => {
        setActive(false)
        if (handleOnOut) handleOnOut()
      }}>
      <StyledLink to={`/work/${slug}`} type="Work">
        <NextWorkImage fluid={image.fluid} />
        <Text>{ title }</Text>
      </StyledLink>
    </Component>
  )
}

NextWork.propTypes = {
  work: PropTypes.object,
  handleOnOver: PropTypes.func,
  handleOnOut: PropTypes.func
}

NextWork.defaultProps = {
}

export default NextWork
