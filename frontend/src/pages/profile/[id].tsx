import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { toast } from "react-toastify";

// Redux + SSR
import wrapper from "@src/store/configureStore";
import { END } from "redux-saga";
import { axiosInstance } from "@src/store/api";

// Requests
import {
  loadToMeRequest,
  loadToUserRequest,
  loadPostsOfUserRequest,
  loadPostsDetailOfUserRequest,
  followRequest,
  unfollowRequest,
  loadFollowersRequest,
  loadFollowingsRequest,
  loadPostsOfBookmarkRequest,
  localLogoutRequest,
  addRoomRequest,
} from "@src/store/actions";

// common-components
import HeadInfo from "@src/components/common/HeadInfo";

// components
import ProfileHead from "@src/components/Profile/ProfileHead";
import ProfileButtons from "@src/components/Profile/ProfileButtons";
import ProfileNav from "@src/components/Profile/ProfileNav";
import ProfileContents from "@src/components/Profile/ProfileContents";
import FollowerModal from "@src/components/Profile/FollowerModal";
import FollowingModal from "@src/components/Profile/FollwingModal";

// type
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { ChatState, UserState } from "@src/store/reducers";

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
    font-weight: bold;
    color: ${({ theme }) => theme.color.blue};
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
  const { push, query } = useRouter();
  const { user, me, followLoading, unfollowLoading } = useSelector(
    ({ user }: { user: UserState }) => user
  );
  const { addRoomDone } = useSelector(({ chat }: { chat: ChatState }) => chat);

  const [isOpenFollowerModal, setIsOpenFollowerModal] = useState(false);
  const onToggleFollowerModal = useCallback(
    () => setIsOpenFollowerModal((prev) => !prev),
    [setIsOpenFollowerModal]
  );

  const [isOpenFollowingModal, setIsOpenFollowingModal] = useState(false);
  const onToggleFollowingModal = useCallback(
    () => setIsOpenFollowingModal((prev) => !prev),
    [setIsOpenFollowingModal]
  );

  // 2022/05/26 - 팔로우/언팔로우 - by 1-blue
  const onClickFollowButton = useCallback(
    (UserId?: number, isFollow?: boolean) => () => {
      if (!me?._id) return toast.error("로그인후에 접근해주세요");

      if (followLoading || unfollowLoading)
        return toast.error(
          "이미 팔로우/언팔로우 처리중입니다.\n잠시후에 다시 시도해주세요"
        );

      if (isFollow === undefined || !UserId)
        return toast.error(
          "문제가 발생해서 실행할 수 없습니다.\n새로고침후에 다시 시도해주세요!"
        );

      if (isFollow) {
        dispatch(unfollowRequest({ UserId }));
      } else {
        dispatch(followRequest({ UserId }));
      }
    },
    [dispatch, me, followLoading, unfollowLoading]
  );

  // 2022/05/27 - 현재 프로필 페이지의 유저의 팔로워들 정보 요청 + 팔로워 모달 열기 - by 1-blue
  const onClickFollowerButton = useCallback(
    (UserId?: number) => () => {
      if (!UserId)
        return toast.error(
          "문제가 발생해서 실행할 수 없습니다.\n새로고침후에 다시 시도해주세요!"
        );

      dispatch(loadFollowersRequest({ UserId }));
      onToggleFollowerModal();
    },
    [dispatch, onToggleFollowerModal]
  );

  // 2022/05/27 - 현재 프로필 페이지의 유저의 팔로잉들 정보 요청 + 팔로잉 모달 열기 - by 1-blue
  const onClickFollowingButton = useCallback(
    (UserId?: number) => () => {
      if (!UserId)
        return toast.error(
          "문제가 발생해서 실행할 수 없습니다.\n새로고침후에 다시 시도해주세요!"
        );

      dispatch(loadFollowingsRequest({ UserId }));
      onToggleFollowingModal();
    },
    [dispatch, onToggleFollowingModal]
  );

  // 2022/05/26 - 로그아웃 요청 - by 1-blue
  const onClickLogOut = useCallback(() => {
    if (!me?._id) return toast.error("로그인후에 접근해주세요");

    dispatch(localLogoutRequest());

    toast.success("로그아웃으로 인해 메인페이지로 이동됩니다.");

    push("/");
  }, [dispatch, me, push]);

  // 2022/05/29 - DM 클릭 시 채팅방 생성 - by 1-blue
  const onClickDM = useCallback(() => {
    if (!user?._id)
      return toast.error(
        "서버측 문제입니다.\n새로고침 후에 다시 시도해주세요!"
      );
    if (!me?._id) return toast.error("로그인후에 접근해주세요!");
    if (me._id === +user._id) return toast.error("본인과 DM을 할 수 없습니다!");

    dispatch(
      addRoomRequest({
        UserId: +user._id,
        roomName: "새로운 채팅방",
      })
    );
  }, [me, dispatch, user]);

  // 2022/05/30 - 생성된 or 존재하는 DM 페이지로 이동 - by 1-blue
  useEffect(() => {
    if (!addRoomDone) return;

    push(`/dm/${addRoomDone}`);
  }, [push, addRoomDone]);

  return (
    <>
      <HeadInfo
        title={`blegram - ${user?.name}님의 프로필`}
        description={`${user?.name}님의 프로필\n( 게시글: ${user?.Posts.length}, 팔로워: ${user?.Followers.length}, 팔로잉: ${user?.Followings.length})\n\n${user?.introduction}`}
        photo={user?.Photos?.[0].name}
      />

      <Wrapper>
        <ProfileHead
          onClickFollowButton={onClickFollowButton}
          onClickLogOut={onClickLogOut}
          onClickDM={onClickDM}
        />
        <ProfileButtons
          onClickFollowerButton={onClickFollowerButton}
          onClickFollowingButton={onClickFollowingButton}
        />
        <ProfileNav />
        <ProfileContents />

        {/* 팔로워 리스트 보여주는 모달 */}
        <FollowerModal
          isOpenFollowingModal={isOpenFollowerModal}
          onToggleFollowerModal={onToggleFollowerModal}
          onClickFollowButton={onClickFollowButton}
        />

        {/* 팔로잉 리스트 보여주는 모달 */}
        <FollowingModal
          isOpenFollowingModal={isOpenFollowingModal}
          onToggleFollowingModal={onToggleFollowingModal}
          onClickFollowButton={onClickFollowButton}
        />
      </Wrapper>
    </>
  );
};

// 2022/01/21 - redux + server-side-rendering - by 1-blue
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      let cookie = context.req?.headers?.cookie;
      cookie = cookie ? cookie : "";
      axiosInstance.defaults.headers.Cookie = cookie;

      const id = +(context.query.id as string);

      store.dispatch(loadToMeRequest());
      store.dispatch(loadToUserRequest({ UserId: id }));

      // 게시글, 상세 게시글, 북마크중에 요청
      switch (context.query.kinds) {
        case "post":
          store.dispatch(
            loadPostsOfUserRequest({
              UserId: id,
              lastId: -1,
              limit: 15,
            })
          );
          break;
        case "detailPost":
          store.dispatch(
            loadPostsDetailOfUserRequest({
              UserId: id,
              lastId: -1,
              limit: 8,
            })
          );
          break;
        case "bookmark":
          store.dispatch(
            loadPostsOfBookmarkRequest({
              PostId: id,
              lastId: -1,
              limit: 8,
            })
          );
          break;

        default:
          store.dispatch(
            loadPostsOfUserRequest({
              UserId: id,
              lastId: -1,
              limit: 15,
            })
          );
          break;
      }

      store.dispatch(END);
      await store.sagaTask?.toPromise();

      // axios의 쿠키 제거
      axiosInstance.defaults.headers.Cookie = "";

      return {
        props: {},
      };
    }
  );

export default Profile;
