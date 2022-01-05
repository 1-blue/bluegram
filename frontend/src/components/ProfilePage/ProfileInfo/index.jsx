import React from "react";
import Proptypes from "prop-types";

import { Wrapper } from "./style";

const ProfileInfo = ({ user, onOpenFollowersDialog, onLoadFollowers, onOpenFollowingsDialog, onLoadFollowings }) => {
  return (
    <Wrapper>
      <li>
        <span>게시물</span>
        <br />
        <span>{user.Posts.length}</span>
      </li>
      <li
        onClick={() => {
          onOpenFollowersDialog();
          onLoadFollowers();
        }}
      >
        <span>팔로워</span>
        <br />
        <span>{user.Followers.length}</span>
      </li>
      <li
        onClick={() => {
          onOpenFollowingsDialog();
          onLoadFollowings();
        }}
      >
        <span>팔로잉</span>
        <br />
        <span>{user.Followings.length}</span>
      </li>
    </Wrapper>
  );
};

ProfileInfo.propTypes = {
  user: Proptypes.object.isRequired,
  onOpenFollowersDialog: Proptypes.func.isRequired,
  onLoadFollowers: Proptypes.func.isRequired,
  onOpenFollowingsDialog: Proptypes.func.isRequired,
  onLoadFollowings: Proptypes.func.isRequired,
};

export default ProfileInfo;
