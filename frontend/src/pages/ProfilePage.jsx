import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// components
import Avatar from "@components/common/Avatar";
import Spinner from "@components/common/Spinner";
import Dialog from "@components/common/Dialog";

import ProfileHead from "@components/ProfilePage/ProfileHead";
import ProfileInfo from "@components/ProfilePage/ProfileInfo";
import ProfileNav from "@components/ProfilePage/ProfileNav";
import ProfileContent from "@components/ProfilePage/ProfileContent";

// action
import {
  loadToUserAction,
  followAction,
  unfollowAction,
  resetFollowAction,
  loadFollowersAction,
  loadFollowingsAction,
  loadPostsOfUserAction,
} from "@store/actions";

// hook
import useOpenClose from "@hooks/useOpenClose";

// styled-components
const Wrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;

  /* 다이어로그 */
  & > aside > ul > li {
    & > a > .dialog-user-name {
      margin-right: 0.6em;

      &:hover {
        text-decoration: underline;
      }
    }
    & > .dialog-follow-button {
      color: var(--light-blue);
    }
    & > .dialog-remove-button {
      color: rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 0.4em;
    }

    & > button:last-child {
      margin-left: auto;
    }
  }
`;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { UserId, role } = useParams();
  const { me, user, Followers, Followings } = useSelector(state => state.user);
  const { loadToUserLoading, loadFollowersLoading, loadFollowingsLoading, followLoading, unfollowLoading } =
    useSelector(state => state.user);
  const { postsOfUser, loadPostsOfUserLoading } = useSelector(state => state.post);
  const [isOpenFollowersDialog, onOpenFollowersDialog, , setIsOpenFollowersDialog] = useOpenClose(false);
  const [isOpenFollowingsDialog, onOpenFollowingsDialog, , setIsOpenFollowingsDialog] = useOpenClose(false);

  // 2021/12/31 - 특정 유저의 정보 요청 - by 1-blue
  useEffect(() => {
    dispatch(loadToUserAction({ UserId }));
  }, [UserId]);

  // 2021/01/04 - params에 따른 각각의 요청 - by 1-blue
  useEffect(() => {
    switch (role) {
      case "post":
        dispatch(loadPostsOfUserAction({ UserId, lastId: -1, limit: 15 }));
        break;
      case "bookmark":
        break;
      case "tag":
        break;

      default:
        break;
    }
  }, [role, UserId]);

  // 2021/12/31 - 팔로우/언팔로우 요청 - by 1-blue
  const onFollow = useCallback(
    (isFollow, UserId) => () => {
      if (isFollow) return dispatch(unfollowAction({ UserId }));
      return dispatch(followAction({ UserId }));
    },
    [],
  );

  // 2021/12/31 - 특정 유저의 팔로워/팔로잉들 정보 요청 - by 1-blue
  const onLoadFollowers = useCallback(() => dispatch(loadFollowersAction({ UserId })), [UserId]);
  const onLoadFollowings = useCallback(() => dispatch(loadFollowingsAction({ UserId })), [UserId]);

  const onCloseFollowersDialog = useCallback(() => {
    setIsOpenFollowersDialog(false);
    dispatch(resetFollowAction());
  }, []);
  const onCloseFollowingsDialog = useCallback(() => {
    setIsOpenFollowingsDialog(false);
    dispatch(resetFollowAction());
  }, []);

  if (!user || loadToUserLoading || !me) return <Spinner page />;

  return (
    <Wrapper>
      <ProfileHead
        user={user}
        me={me}
        followLoading={followLoading}
        unfollowLoading={unfollowLoading}
        navigate={navigate}
        onFollow={onFollow}
        UserId={UserId}
      />
      <ProfileInfo
        user={user}
        onOpenFollowersDialog={onOpenFollowersDialog}
        onLoadFollowers={onLoadFollowers}
        onOpenFollowingsDialog={onOpenFollowingsDialog}
        onLoadFollowings={onLoadFollowings}
      />
      <ProfileNav UserId={UserId} navigate={navigate} />

      <ProfileContent role={role} />

      {/* 팔로워들에 대한 다이어로그창 */}
      {isOpenFollowersDialog && (
        <Dialog onClose={onCloseFollowersDialog} showDialog={isOpenFollowersDialog}>
          {loadFollowersLoading || !Followers ? (
            <Spinner comment />
          ) : (
            Followers.map(follower => (
              <li key={follower._id}>
                <Link to={`/profile/${follower._id}/post`}>
                  <Avatar
                    width={30}
                    height={30}
                    image={follower.Images[0]}
                    alt="유저 프로필 이미지"
                    style={{ marginRight: "0.5em" }}
                  />
                </Link>
                <Link to={`/profile/${follower._id}/post`}>
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
      )}

      {/* 팔로잉들에 대한 다이어로그창 */}
      {isOpenFollowingsDialog && (
        <Dialog onClose={onCloseFollowingsDialog} showDialog={isOpenFollowingsDialog}>
          {loadFollowingsLoading || !Followings ? (
            <Spinner comment />
          ) : (
            Followings.map(following => (
              <li key={following._id}>
                <Link to={`/profile/${following._id}/post`}>
                  <Avatar
                    width={30}
                    height={30}
                    image={following.Images[0]}
                    alt="유저 프로필 이미지"
                    style={{ marginRight: "0.5em" }}
                  />
                </Link>
                <Link to={`/profile/${following._id}/post`}>
                  <span className="dialog-user-name">{following.name}</span>
                </Link>
                {/* 언팔로우(내가 팔로잉 하는 사람을 리스트에서 없앰) */}
                {me._id !== following._id && (
                  <button
                    type="button"
                    className="dialog-follow-button"
                    onClick={onFollow(
                      user.Followers.some(userFollower => userFollower._id === following._id),
                      following._id,
                    )}
                  >
                    {followLoading || unfollowLoading ? (
                      <Spinner button />
                    ) : user.Followers.some(userFollower => userFollower._id === following._id) ? (
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
      )}
    </Wrapper>
  );
};

export default ProfilePage;
