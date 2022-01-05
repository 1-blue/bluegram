import React from "react";
import Proptypes from "prop-types";

// components
import Icon from "@components/common/Icon";

// styled-components
import { Wrapper } from "./style";

const ProfileNav = ({ UserId, navigate }) => {
  return (
    <Wrapper>
      <li>
        <Icon shape="post" onClick={() => navigate(`/profile/${UserId}/post`)} />
      </li>
      <li>
        <Icon shape="bookmark" onClick={() => navigate(`/profile/${UserId}/bookmark`)} />
      </li>
      <li>
        <Icon shape="tag" onClick={() => navigate(`/profile/${UserId}/tag`)} />
      </li>
    </Wrapper>
  );
};

ProfileNav.propTypes = {
  UserId: Proptypes.string.isRequired,
  navigate: Proptypes.func.isRequired,
};

export default ProfileNav;
