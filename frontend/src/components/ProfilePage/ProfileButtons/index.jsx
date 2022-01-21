import React from "react";
import { useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

const ProfileButtons = () => {
  const { user } = useSelector(state => state.user);

  return (
    <Wrapper>
      <button type="button" className="button-list">
        <span className="button-name">게시물</span>
        <br />
        <span className="count">{user.Posts.length}</span>
      </button>
      <button type="button" className="button-list">
        <span className="button-name">팔로워</span>
        <br />
        <span className="count">{user.Followers.length}</span>
      </button>
      <button type="button" className="button-list">
        <span className="button-name">팔로잉</span>
        <br />
        <span className="count">{user.Followings.length}</span>
      </button>
    </Wrapper>
  );
};

export default ProfileButtons;
