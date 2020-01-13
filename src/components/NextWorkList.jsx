import React, { useState} from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Img from "gatsby-image"
import InternalLink from "@components/InternalLink"

import NextWork from "@components/NextWork";

import { MID_TABLET, BELOW_TABLET } from "@global/constants"

const StyledNextWork = styled(NextWork)`
  transition: 200ms opacity ease-out;
  margin-right: 25px;
`

const Component = styled.div`
  &.hasOver {
    ${StyledNextWork} {
      opacity: 0.5;
      
      &.active {
        opacity: 1;
        z-index: 10;
      }
    }
  }
`

const NextWorkList = ({ works }) => {

  const [ hasOver, setHasOver ] = useState(false)

  const [ renderedWorks ] = useState(() => {
    return works.map(function(work) {
      return <StyledNextWork key={work.contentful_id} work={work} handleOnOver={()=>setHasOver(true)} handleOnOut={()=>setHasOver(false)} />
    })
  }, [works])

  const classes = hasOver ? 'hasOver' : ''

  return (
    <Component className={classes}>
      { renderedWorks }
    </Component>
  )
}

NextWorkList.propTypes = {
  works: PropTypes.array
}

NextWorkList.defaultProps = {
}

export default NextWorkList
