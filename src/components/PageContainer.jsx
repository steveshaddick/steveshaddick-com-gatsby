import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
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
