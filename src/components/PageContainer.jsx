import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { PALM } from "@global/constants"

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding-bottom: 100px;
  background: #fafafa;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;

  @media ${PALM} {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
  }
`

const PageContainer = ({ children, className }) => (
  <Container className={className}>
    {children}
  </Container>
)

PageContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

PageContainer.defaultProps = {
}

export default PageContainer
