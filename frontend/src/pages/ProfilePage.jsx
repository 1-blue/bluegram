import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// components
import Avatar from "@components/common/Avatar";
import Spinner from "@components/common/Spinner";
import Icon from "@components/common/Icon";
import Dialog from "@components/common/Dialog";

// action
import {
  loadToUserAction,
  followAction,
  unfollowAction,
  resetFollowAction,
  loadFollowersAction,
  loadFollowingsAction,
} from "@store/actions";

// hook
import useOpenClose from "@hooks/useOpenClose";

// styled-components
const Wrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;

  & > .profile-head {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 1em;

    & > .profile-head-right {
      flex: 1 0 auto;
      display: flex;
      flex-flow: column nowrap;

      & > span {
        flex: 1 0 auto;
        font-size: 1.6rem;
      }

      & > button {
        flex: 1 0 auto;
        width: 50%;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 0.2em;
        font-weight: bold;
      }
    }
  }

  & > .profile-info,
  & > .profile-nav {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    & > li {
      flex: 1 0 auto;
      text-align: center;
      padding: 1em;
      cursor: pointer;

      & > span:first-child {
        color: gray;
      }

      & > span:last-child {
        font-weight: bold;
      }
    }
  }

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
  const { me, user, loadToUserLoading, Followers, Followings } = useSelector(state => state.user);
  const { UserId } = useParams();
  const [isOpen, onOpenDialog, , setIsOpen] = useOpenClose(false);
  const isFollow = me?.Followings.some(following => following._id === user?._id);

  // 2021/12/31 - 특정 유저의 정보 요청 - by 1-blue
  useEffect(() => {
    dispatch(loadToUserAction({ UserId }));
  }, [UserId]);

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

  const onCloseDialog = useCallback(() => {
    setIsOpen(false);
    dispatch(resetFollowAction());
  }, []);

  if (!user || loadToUserLoading || !me) return <Spinner page />;

  return (
    <Wrapper>
      <div className="profile-head">
        <Avatar width={77} height={77} image={user.Images[0]} style={{ marginRight: "2em" }} />
        <div className="profile-head-right">
          <span>{user.name}</span>

          {user._id === me._id ? (
            <button type="button">프로필 편집</button>
          ) : (
            <button type="button" onClick={onFollow(isFollow, UserId)}>
              {isFollow ? "언팔로우" : "팔로우"}
            </button>
          )}
        </div>
      </div>
      <ul className="profile-info">
        <li>
          <span>게시물</span>
          <br />
          <span>{user.Posts.length}</span>
        </li>
        <li
          onClick={() => {
            onOpenDialog();
            onLoadFollowers();
          }}
        >
          <span>팔로워</span>
          <br />
          <span>{user.Followers.length}</span>
        </li>
        <li
          onClick={() => {
            onOpenDialog();
            onLoadFollowings();
          }}
        >
          <span>팔로잉</span>
          <br />
          <span>{user.Followings.length}</span>
        </li>
      </ul>
      <ul className="profile-nav">
        <li>
          <Icon shape="post" />
        </li>
        <li>
          <Icon shape="bookmark" />
        </li>
        <li>
          <Icon shape="tag" />
        </li>
      </ul>
      <section className="content">
        <h1>아이콘에 대한 컨텐츠 넣기</h1>
      </section>

      {/* 팔로워/팔로잉에 대한 다이어로그창 */}
      {isOpen && (Followers || Followings) && (
        <Dialog onClose={onCloseDialog} showDialog={isOpen}>
          {Followers
            ? Followers.map(follower => (
                <li key={follower._id}>
                  <Link to={`/profile/${follower._id}`}>
                    <Avatar
                      width={30}
                      height={30}
                      image={follower.Images[0]}
                      alt="유저 프로필 이미지"
                      style={{ marginRight: "0.5em" }}
                    />
                  </Link>
                  <Link to={`/profile/${follower._id}`}>
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
                        {me.Followings.some(myFollowing => myFollowing._id === follower._id) ? "언팔로우" : "팔로우"}
                      </button>

                      {/* 차단 ( 나를 팔로잉 하는 사람을 제거한다 ) */}
                      <button type="button" className="dialog-remove-button" onClick={onFollow(true, follower._id)}>
                        삭제
                      </button>
                    </>
                  )}
                </li>
              ))
            : Followings.map(following => (
                <li key={following._id}>
                  <Link to={`/profile/${following._id}`}>
                    <Avatar
                      width={30}
                      height={30}
                      image={following.Images[0]}
                      alt="유저 프로필 이미지"
                      style={{ marginRight: "0.5em" }}
                    />
                  </Link>
                  <Link to={`/profile/${following._id}`}>
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
                      {user.Followers.some(userFollower => userFollower._id === following._id) ? "언팔로우" : "팔로우"}
                    </button>
                  )}
                </li>
              ))}
        </Dialog>
      )}
    </Wrapper>
  );
};

export default ProfilePage;
