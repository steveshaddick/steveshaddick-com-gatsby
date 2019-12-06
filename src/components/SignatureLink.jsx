import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import signature from "@images/signature.png"

const Container = styled.div`
  display: inline-block;
  margin: 0;
  padding: 0;

  img {
    margin: 0;
    padding-top: 8px;
  }
`

const SignatureLink = () => (
  <Container>
    <img style={{height: '30px'}} src={signature} alt="Steve Shaddick" />
  </Container>
)

SignatureLink.propTypes = {
}

SignatureLink.defaultProps = {
}

export default SignatureLink
