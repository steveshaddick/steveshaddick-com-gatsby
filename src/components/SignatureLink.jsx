import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import signature from "@images/signature.png"

import { PALM } from "@global/constants"

const Container = styled.div`
  display: inline-block;
  margin: 0;
  padding: 0;

  a {
    
  }

  img {
    margin: 0;
    padding-top: 8px;
    height: 40px;

    @media ${PALM} {
      height: 35px;
    }

  }
`

const SignatureLink = () => (
  <Container>
    <a href="/"><img src={signature} alt="Steve Shaddick" /></a>
  </Container>
)

SignatureLink.propTypes = {
}

SignatureLink.defaultProps = {
}

export default SignatureLink
