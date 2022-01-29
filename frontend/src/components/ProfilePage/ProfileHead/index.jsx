/**
 * 생성일: 2022/01/21
 * 수정일: 2022/01/26
 * 작성자: 1-blue
 *
 * 프로필 페이지 상단부분
 * 유저 정보 수정 or 팔로우/언팔로우 기능
 * 로그아웃 버튼 추가
 * 로그아웃 버튼 수정
 */

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@components/common/Avatar";
import Button from "@components/common/Button";

const ProfileHead = ({ onClickFollowButton, onClickLogOut }) => {
  const { me, user } = useSelector(state => state.user);
  const { followLoading, unfollowLoading } = useSelector(state => state.user);
  const isMyFollower = me?.Followings?.some(following => following._id === user._id);

  return (
    <Wrapper followLoading={followLoading || unfollowLoading}>
      <Avatar width={60} height={60} image={user.Images[0]} className="user-profile-image" />
      <div className="profile-head-right-container">
        <div className="profile-head-right-top-container">
          <span className="user-name">{user.name}</span>
          {me._id === user._id && (
            <button type="button" className="logout-button" onClick={onClickLogOut}>
              로그아웃
            </button>
          )}
        </div>
        {me._id === user._id ? (
          <Link href={`/account/edit/${me._id}?kinds=nomal`}>
            <a className="profile-edit-link">프로필 편집</a>
          </Link>
        ) : (
          <Button
            type="button"
            className="profile-follow-button"
            onClick={onClickFollowButton(user._id, isMyFollower)}
            $follow
            loading={followLoading || unfollowLoading}
          >
            {isMyFollower ? "언팔로우" : "팔로우"}
          </Button>
        )}
        <p className="profile-user-about">{user.about}</p>
      </div>
    </Wrapper>
  );
};

ProfileHead.propTypes = {
  onClickFollowButton: Proptypes.func.isRequired,
  onClickLogOut: Proptypes.func.isRequired,
};

export default ProfileHead;
