import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// component
import Icon from "@components/common/Icon";

const GitHubLink = styled.a`
  font-weight: bold;

  @media (max-width: 486px) {
    display: none;
  }
`;

const LeftMenu = () => {
  return (
    <>
      <Link to="/">
        <Icon shape="logo" width={40} height={40} />
      </Link>
      <GitHubLink href="https://github.com/1-blue/bluegram" target="_blank">
        GitHub
      </GitHubLink>
    </>
  );
};

export default LeftMenu;
