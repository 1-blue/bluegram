/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/26
 * 작성자: 1-blue
 *
 * 프로필 페이지
 * 특정 유저의 프로필을 보여줄 페이지
 * ServerSideRedering 구문 추가
 * 팔로우/언팔로우 기능 추가
 * 팔로우/언팔로우 모달 추가
 * 북마크된 게시글 보기 추가
 * 로그아웃 추가
 * 비로그인시 접근 가능하도록 수정
 */

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";

// Redux + SSR
import wrapper from "@store/configureStore";
import { END } from "redux-saga";
import { userInstance, postsInstance, bookmarkInstance } from "@store/api";

// actions
import {
  loadToMeAction,
  loadToUserAction,
  loadPostsOfUserAction,
  loadPostsDetailOfUserAction,
  followAction,
  unfollowAction,
  loadFollowersAction,
  loadFollowingsAction,
  loadPostsOfBookmarkAction,
  localLogoutAction,
} from "@store/actions";

// common-components
import HeadInfo from "@components/common/HeadInfo";

// components
import ProfileHead from "@components/ProfilePage/ProfileHead";
import ProfileButtons from "@components/ProfilePage/ProfileButtons";
import ProfileNav from "@components/ProfilePage/ProfileNav";
import ProfileContents from "@components/ProfilePage/ProfileContents";
import ProfileFollowerModal from "@components/ProfilePage/ProfileFollowerModal";
import ProfileFollowingModal from "@components/ProfilePage/ProfileFollowingModal";

// hooks
import useOpenClose from "@hooks/useOpenClose";

// styled-components
const Wrapper = styled.article`
  max-width: 768px;
  margin: auto;

  /* 팔로워/팔로잉 모달 */
  & .follow-modal {
    width: 280px;
    background: white;
    border-radius: 0.4em;
    padding: 0.6em 1em;
  }

  /* 팔로워/팔로잉 리스트 */
  & .follow-modal-follow-list {
    display: flex;
    align-items: center;
    margin-bottom: 0.4em;

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* 팔로워/팔로잉 아바타 */
  & .follow-modal-follow-avatar {
    margin-right: 0.6em;
  }

  /* 팔로워/팔로잉 이름 */
  & .follow-modal-follow-name {
    font-size: 0.9em;
    font-weight: 700;
  }

  /* 아무 의미 없이 flex의 남은 공간 차지를 위해 사용 */
  & .no-content {
    flex: 1;
  }

  /* 팔로우/언팔로우 버튼 */
  & .follow-modal-follow-button {
    text-align: end;
    font-size: 0.8em;
  }

  /* 팔로워/팔로잉이 없을 경우 */
  & .follow-modal-no-follow-icon,
  .follow-modal-no-follow-title,
  .follow-modal-no-follow-description {
    text-align: center;
  }
  & .follow-modal-no-follow-title {
    font-size: 1rem;
    color: gray;
  }
  & .follow-modal-no-follow-description {
    font-size: 0.8rem;
    word-break: keep-all;
  }
`;

const Profile = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { me, user, followLoading, unfollowLoading } = useSelector(state => state.user);
  const [isOpenFollower, onOpenFollowerModal, onCloseFollowerModal] = useOpenClose(false);
  const [isOpenFollowing, onOpenFollowingModal, onCloseFollowingModal] = useOpenClose(false);

  // 2022/01/22 - 팔로우/언팔로우 - by 1-blue
  const onClickFollowButton = useCallback(
    (UserId, isFollow) => () => {
      if (!me._id) return alert("로그인후에 접근해주세요");

      if (followLoading || unfollowLoading)
        return alert("이미 팔로우/언팔로우 처리중입니다.\n잠시후에 다시 시도해주세요");

      if (isFollow) {
        dispatch(unfollowAction({ UserId }));
      } else {
        dispatch(followAction({ UserId }));
      }
    },
    [me, followLoading, unfollowLoading],
  );

  // 2022/01/22 - 현재 프로필 페이지의 유저의 팔로워들 정보 요청 + 팔로워 모달 열기 - by 1-blue
  const onClickFollowerButton = useCallback(
    UserId => () => {
      dispatch(loadFollowersAction({ UserId }));
      onOpenFollowerModal();
    },
    [onOpenFollowerModal],
  );

  // 2022/01/22 - 현재 프로필 페이지의 유저의 팔로잉들 정보 요청 + 팔로잉 모달 열기 - by 1-blue
  const onClickFollowingButton = useCallback(
    UserId => () => {
      dispatch(loadFollowingsAction({ UserId }));
      onOpenFollowingModal();
    },
    [onOpenFollowingModal],
  );

  // 2022/01/24 - 로그아웃 요청 - by 1-blue
  const onClickLogOut = useCallback(() => {
    if (!me._id) return alert("로그인후에 접근해주세요");

    dispatch(localLogoutAction());

    alert("로그아웃으로 인해 메인페이지로 이동됩니다.");

    push("/");
  }, [me]);

  return (
    <>
      <HeadInfo
        title="bluegram - profile"
        description={`${user.name}님의 프로필\n( 게시글: ${user.Posts.length}, 팔로워: ${user.Followers.length}, 팔로잉: ${user.Followings.length})\n\n${user.about}`}
        image={process.env.NEXT_PUBLIC_IMAGE_URL + "/" + user.Images[0].name}
      />

      <Wrapper>
        <ProfileHead onClickFollowButton={onClickFollowButton} onClickLogOut={onClickLogOut} />
        <ProfileButtons onClickFollowerButton={onClickFollowerButton} onClickFollowingButton={onClickFollowingButton} />
        <ProfileNav />
        <ProfileContents />

        {/* 팔로워 리스트 보여주는 모달 */}
        <ProfileFollowerModal
          isOpenFollower={isOpenFollower}
          onCloseFollowerModal={onCloseFollowerModal}
          onClickFollowButton={onClickFollowButton}
        />

        {/* 팔로잉 리스트 보여주는 모달 */}
        <ProfileFollowingModal
          isOpenFollowing={isOpenFollowing}
          onCloseFollowingModal={onCloseFollowingModal}
          onClickFollowButton={onClickFollowButton}
        />
      </Wrapper>
    </>
  );
};

// 2022/01/21 - redux + server-side-rendering - by 1-blue
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  let cookie = context.req?.headers?.cookie;
  cookie = cookie ? cookie : "";
  userInstance.defaults.headers.Cookie = cookie;
  postsInstance.defaults.headers.Cookie = cookie;
  bookmarkInstance.defaults.headers.Cookie = cookie;

  store.dispatch(loadToMeAction());
  store.dispatch(loadToUserAction({ UserId: context.query.id }));

  // 게시글, 상세 게시글, 북마크중에 요청
  switch (context.query.kinds) {
    case "post":
      store.dispatch(loadPostsOfUserAction({ UserId: context.query.id, lastId: -1, limit: 15 }));
      break;
    case "detailPost":
      store.dispatch(loadPostsDetailOfUserAction({ UserId: context.query.id, lastId: -1, limit: 8 }));
      break;
    case "bookmark":
      store.dispatch(loadPostsOfBookmarkAction({ PostId: context.query.id, lastId: -1, limit: 8 }));
      break;

    default:
      store.dispatch(loadPostsOfUserAction({ UserId: context.query.id, lastId: -1, limit: 15 }));
      break;
  }

  store.dispatch(END);
  await store.sagaTask.toPromise();

  // axios의 쿠키 제거
  userInstance.defaults.headers.Cookie = "";
  postsInstance.defaults.headers.Cookie = "";
  bookmarkInstance.defaults.headers.Cookie = "";
});

export default Profile;
