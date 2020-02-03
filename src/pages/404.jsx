import React from "react";
import { createGlobalStyle } from "styled-components";

import SEO from "@components/SEO";
import PageContainer from "@components/PageContainer";

import "@layouts/DefaultLayout/dark-styles.css";

const GlobalStyle = createGlobalStyle`
  body {
    background: rgb(50, 50, 50);
    color: #fff;
    
    .PageContainer {
      background: rgb(50, 50, 50);
    }
  }
`;

/**
 * Page Component definition
 */
const NotFoundPage = () => (
  <PageContainer>
    <GlobalStyle />
    <SEO title="404: Not found" />
    <h1>NOTHING TO SEE HERE</h1>
    <p>You&apos;re looking for something that doesn&apos;t exist.</p>
  </PageContainer>
);

export default NotFoundPage;
