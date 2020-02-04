import React, { useEffect } from "react";

import SEO from "@components/SEO";
import PageContainer from "@components/PageContainer";

/**
 * Page Component definition
 */
const NotFoundPage = () => {
  useEffect(() => {
    document.body.classList.add("dark");

    return function cleanup() {
      document.body.classList.remove("dark");
    };
  }, []);

  return (
    <PageContainer>
      <SEO title="404: Not found" />
      <h1>NOTHING TO SEE HERE</h1>
      <p>You&apos;re looking for something that doesn&apos;t exist.</p>
    </PageContainer>
  );
};

export default NotFoundPage;
