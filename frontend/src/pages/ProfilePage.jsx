import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// components
import Avatar from "@components/common/Avatar";
import Spinner from "@components/common/Spinner";
import Icon from "@components/common/Icon";

// action
import { loadToUserAction, followAction, unfollowAction } from "@store/actions";
import { useEffect } from "react";

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

      & > span:first-child {
        color: gray;
      }

      & > span:last-child {
        font-weight: bold;
      }
    }
  }
`;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { me, user, loadToUserLoading } = useSelector(state => state.user);
  const { UserId } = useParams();
  const isFollow = me?.Followings.some(following => following._id === user?._id);

  useEffect(() => {
    dispatch(loadToUserAction({ UserId }));
  }, [UserId]);

  const onFollow = useCallback(() => {
    if (isFollow) return dispatch(unfollowAction({ UserId }));
    return dispatch(followAction({ UserId }));
  }, [isFollow]);

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
            <button type="button" onClick={onFollow}>
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
        <li>
          <span>팔로워</span>
          <br />
          <span>{user.Followers.length}</span>
        </li>
        <li>
          <span>팔로잉 </span>
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
    </Wrapper>
  );
};

export default ProfilePage;
