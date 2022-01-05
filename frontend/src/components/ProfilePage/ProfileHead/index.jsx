import React from "react";
import { useSelector } from "react-redux";
import Proptypes from "prop-types";

// components
import Avatar from "@components/common/Avatar";
import Spinner from "@components/common/Spinner";

// styled-components
import { Wrapper } from "./style";

const ProfileHead = ({ me, user, navigate, onFollow, UserId }) => {
  const { followLoading, unfollowLoading } = useSelector(state => state.user);
  const isFollow = me.Followings?.some(following => following._id === user?._id);

  return (
    <Wrapper>
      <Avatar width={77} height={77} image={user.Images[0]} style={{ marginRight: "2em" }} />
      <div className="profile-head-right">
        <span>{user.name}</span>

        {user._id === me._id ? (
          <button type="button" onClick={() => navigate("/profile/edit/account")}>
            프로필 편집
          </button>
        ) : (
          <button type="button" onClick={onFollow(isFollow, UserId)}>
            {followLoading || unfollowLoading ? <Spinner button /> : isFollow ? "언팔로우" : "팔로우"}
          </button>
        )}
      </div>
    </Wrapper>
  );
};

ProfileHead.propTypes = {
  me: Proptypes.object.isRequired,
  user: Proptypes.object.isRequired,
  navigate: Proptypes.func.isRequired,
  onFollow: Proptypes.func.isRequired,
  UserId: Proptypes.string.isRequired,
};

export default ProfileHead;
