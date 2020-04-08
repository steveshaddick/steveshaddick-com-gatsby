import React, { useState } from "react";
//import PropTypes from "prop-types";
import styled from "styled-components";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * STYLES
 */
export const PageContainer = styled.div`
  min-height: 500px;

  .btn {
    font-size: 16px;
    padding: 12px;
  }

  .dropdown-toggle {
    max-width: 150px;
    width: 150px;
    overflow-x: auto;
  }
`;

/**
 * CODE
 */

/**
 * Page Component definition
 */
const OverflowTestPage = () => {
  const [dropdownTitle, setTitle] = useState(
    "A long amount of text that needs to scroll"
  );

  return (
    <PageContainer>
      <DropdownButton
        id="dropdown-basic-button"
        title={dropdownTitle}
        onSelect={eventKey => {
          console.log(eventKey);
          setTitle(eventKey);
        }}
      >
        <Dropdown.Item
          href="#/action-1"
          eventKey="Another Item with really long text that needs to scroll"
        >
          Another Item with really long text that needs to scroll
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2" eventKey="Another Item">
          Another Item
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" eventKey="Something else">
          Something else
        </Dropdown.Item>
      </DropdownButton>
    </PageContainer>
  );
};

OverflowTestPage.propTypes = {};

export default OverflowTestPage;
