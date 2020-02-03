import React from "react";
import { createGlobalStyle } from "styled-components";

import SEO from "@components/SEO";
import PageContainer from "@components/PageContainer";

const GlobalStyle = createGlobalStyle`
  body {
    background: rgb(75, 75, 75);
    color: #fff;
    
    .PageContainer {
      background: rgb(75, 75, 75);
    }
  }
`;

/**
 * Page Component definition
 */
const NotFoundPage = () => (
  <PageContainer>
    <SEO title="404: Not found" />
    <h1>NOTHING TO SEE HERE</h1>
    <p>You&apos;re looking for something that doesn&apos;t exist.</p>
  </PageContainer>
);

export default NotFoundPage;
