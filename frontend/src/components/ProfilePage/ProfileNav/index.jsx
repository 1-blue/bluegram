import React from "react";
import Link from "next/link";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@components/common/Icon";

const ProfileNav = ({ id }) => {
  return (
    <Wrapper>
      <Link href={`/profile/${id}?kinds=post`}>
        <a className="nav-list">
          <Icon width={24} height={24} shape="post" />
        </a>
      </Link>
      <Link href={`/profile/${id}?kinds=detailPost`}>
        <a className="nav-list">
          <Icon width={24} height={24} shape="airplane" />
        </a>
      </Link>
      <Link href={`/profile/${id}?kinds=bookmark`}>
        <a className="nav-list">
          <Icon width={24} height={24} shape="bookmark" />
        </a>
      </Link>
    </Wrapper>
  );
};

ProfileNav.propTypes = {
  id: Proptypes.string.isRequired,
};

export default ProfileNav;
