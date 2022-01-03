import React from "react";
import { Link } from "react-router-dom";

// component
import Icon from "@components/common/Icon";

const LeftMenu = () => {
  return (
    <>
      <Link to="/">
        <Icon shape="logo" width={40} height={40} />
      </Link>
      <a href="https://github.com/1-blue/bluegram" target="_blank" style={{ fontWeight: "bold" }}>
        GitHub
      </a>
    </>
  );
};

export default LeftMenu;
