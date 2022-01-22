/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/22
 * 작성자: 1-blue
 *
 * 프로필 페이지
 * 특정 유저의 프로필을 보여줄 페이지
 * ServerSideRedering 구문 추가
 * 팔로우/언팔로우 기능 추가
 * 팔로우/언팔로우 모달 추가
 */

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// styled-components
import { Wrapper } from "./style";

// Redux + SSR
import wrapper from "@store/configureStore";
import { END } from "redux-saga";
import { userInstance, postsInstance } from "@store/api";

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
} from "@store/actions";

// components
import ProfileHead from "@components/ProfilePage/ProfileHead";
import ProfileButtons from "@components/ProfilePage/ProfileButtons";
import ProfileNav from "@components/ProfilePage/ProfileNav";
import ProfileContents from "@components/ProfilePage/ProfileContents";
import ProfileFollowerModal from "@components/ProfilePage/ProfileFollowerModal";
import ProfileFollowingModal from "@components/ProfilePage/ProfileFollowingModal";

// hooks
import useOpenClose from "@hooks/useOpenClose";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    query: { id, kinds },
  } = useRouter();
  const { followLoading, unfollowLoading } = useSelector(state => state.user);
  const [isOpenFollower, onOpenFollowerModal, onCloseFollowerModal] = useOpenClose(false);
  const [isOpenFollowing, onOpenFollowingModal, onCloseFollowingModal] = useOpenClose(false);

  // 2022/01/22 - 팔로우/언팔로우 - by 1-blue
  const onClickFollowButton = useCallback(
    (UserId, isFollow) => () => {
      if (followLoading || unfollowLoading)
        return alert("이미 팔로우/언팔로우 처리중입니다.\n잠시후에 다시 시도해주세요");

      if (isFollow) {
        dispatch(unfollowAction({ UserId }));
      } else {
        dispatch(followAction({ UserId }));
      }
    },
    [followLoading, unfollowLoading],
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

  return (
    <Wrapper>
      <ProfileHead onClickFollowButton={onClickFollowButton} />
      <ProfileButtons onClickFollowerButton={onClickFollowerButton} onClickFollowingButton={onClickFollowingButton} />
      <ProfileNav id={id} kinds={kinds} />
      <ProfileContents id={id} kinds={kinds} />

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
  );
};

// 2022/01/21 - redux + server-side-rendering - by 1-blue
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  let cookie = context.req?.headers?.cookie;
  cookie = cookie ? cookie : "";
  userInstance.defaults.headers.Cookie = cookie;
  postsInstance.defaults.headers.Cookie = cookie;

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
      // 북마크한 게시글 불러오는 액션 추가하기
      // store.dispatch(loadToUserAction({ UserId: context.query.id }));
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
});

export default Profile;
