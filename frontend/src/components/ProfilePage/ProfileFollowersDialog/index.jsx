import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

// components
import Dialog from "@components/common/Dialog";
import Spinner from "@components/common/Spinner";
import Avatar from "@components/common/Avatar";

// styled-components
import { Wrapper } from "./style";

const ProfileFollowersDialog = ({ me, isOpenFollowersDialog, onCloseFollowersDialog, onFollow }) => {
  const { Followers } = useSelector(state => state.user);
  const { loadFollowersLoading, followLoading, unfollowLoading } = useSelector(state => state.user);

  return (
    <Wrapper>
      <Dialog onClose={onCloseFollowersDialog} showDialog={isOpenFollowersDialog}>
        {loadFollowersLoading || !Followers ? (
          <Spinner comment />
        ) : (
          Followers.map(follower => (
            <li key={follower._id}>
              <Link to={`/profile/${follower._id}/post`} onClick={() => onCloseFollowersDialog()}>
                <Avatar
                  width={30}
                  height={30}
                  image={follower.Images[0]}
                  alt="유저 프로필 이미지"
                  style={{ marginRight: "0.5em" }}
                />
              </Link>
              <Link to={`/profile/${follower._id}/post`} onClick={() => onCloseFollowersDialog()}>
                <span className="dialog-user-name">{follower.name}</span>
              </Link>
              {me._id !== follower._id && (
                <>
                  {/* 팔로우/팔로잉 */}
                  <button
                    type="button"
                    className="dialog-follow-button"
                    onClick={onFollow(
                      me.Followings.some(myFollowing => myFollowing._id === follower._id),
                      follower._id,
                    )}
                  >
                    {followLoading || unfollowLoading ? (
                      <Spinner button />
                    ) : me.Followings.some(myFollowing => myFollowing._id === follower._id) ? (
                      "언팔로우"
                    ) : (
                      "팔로우"
                    )}
                  </button>

                  {/* 차단 ( 나를 팔로잉 하는 사람을 제거한다 ) */}
                  <button type="button" className="dialog-remove-button" onClick={onFollow(true, follower._id)}>
                    삭제
                  </button>
                </>
              )}
            </li>
          ))
        )}
      </Dialog>
    </Wrapper>
  );
};

ProfileFollowersDialog.propTypes = {
  me: Proptypes.object.isRequired,
  isOpenFollowersDialog: Proptypes.bool.isRequired,
  onCloseFollowersDialog: Proptypes.func.isRequired,
  onFollow: Proptypes.func.isRequired,
};

export default ProfileFollowersDialog;
