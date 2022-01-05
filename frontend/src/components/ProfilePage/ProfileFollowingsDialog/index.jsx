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

const ProfileFollowingsDialog = ({ me, user, isOpenFollowingsDialog, onCloseFollowingsDialog, onFollow }) => {
  const { Followings } = useSelector(state => state.user);
  const { loadFollowingsLoading, followLoading, unfollowLoading } = useSelector(state => state.user);

  return (
    <Wrapper>
      <Dialog onClose={onCloseFollowingsDialog} showDialog={isOpenFollowingsDialog}>
        {loadFollowingsLoading || !Followings ? (
          <Spinner comment />
        ) : (
          Followings.map(following => (
            <li key={following._id}>
              <Link to={`/profile/${following._id}/post`} onClick={() => onCloseFollowingsDialog()}>
                <Avatar
                  width={30}
                  height={30}
                  image={following.Images[0]}
                  alt="유저 프로필 이미지"
                  style={{ marginRight: "0.5em" }}
                />
              </Link>
              <Link to={`/profile/${following._id}/post`} onClick={() => onCloseFollowingsDialog()}>
                <span className="dialog-user-name">{following.name}</span>
              </Link>
              {/* 언팔로우(내가 팔로잉 하는 사람을 리스트에서 없앰) */}
              {me._id !== following._id && (
                <button
                  type="button"
                  className="dialog-follow-button"
                  onClick={onFollow(
                    user.Followings.some(userFollowing => userFollowing._id === following._id),
                    following._id,
                  )}
                >
                  {followLoading || unfollowLoading ? (
                    <Spinner button />
                  ) : user.Followings.some(userFollowing => userFollowing._id === following._id) ? (
                    "언팔로우"
                  ) : (
                    "팔로우"
                  )}
                </button>
              )}
            </li>
          ))
        )}
      </Dialog>
    </Wrapper>
  );
};

ProfileFollowingsDialog.propTypes = {
  me: Proptypes.object.isRequired,
  user: Proptypes.object.isRequired,
  isOpenFollowingsDialog: Proptypes.bool.isRequired,
  onCloseFollowingsDialog: Proptypes.func.isRequired,
  onFollow: Proptypes.func.isRequired,
};

export default ProfileFollowingsDialog;
