/**
 * 생성일: 2022/01/21
 * 수정일: 2022/01/22
 * 작성자: 1-blue
 *
 * 팔로워/팔로워 모달창 열기 버튼
 */

import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const ProfileButtons = ({ onClickFollowerButton, onClickFollowingButton }) => {
  const { user } = useSelector(state => state.user);

  return (
    <Wrapper>
      <button type="button" className="button-list">
        <span className="button-name">게시물</span>
        <br />
        <span className="count">{user.Posts.length}</span>
      </button>
      <button type="button" className="button-list" onClick={onClickFollowerButton(user._id)}>
        <span className="button-name">팔로워</span>
        <br />
        <span className="count">{user.Followers.length}</span>
      </button>
      <button type="button" className="button-list" onClick={onClickFollowingButton(user._id)}>
        <span className="button-name">팔로잉</span>
        <br />
        <span className="count">{user.Followings.length}</span>
      </button>
    </Wrapper>
  );
};

ProfileButtons.propTypes = {
  onClickFollowerButton: PropTypes.func.isRequired,
  onClickFollowingButton: PropTypes.func.isRequired,
};

export default ProfileButtons;
