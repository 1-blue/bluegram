import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// components
import Spinner from "@components/common/Spinner";
import Toast from "@components/common/Toast";

import ProfileHead from "@components/ProfilePage/ProfileHead";
import ProfileInfo from "@components/ProfilePage/ProfileInfo";
import ProfileNav from "@components/ProfilePage/ProfileNav";
import ProfileContent from "@components/ProfilePage/ProfileContent";
import ProfileFollowersDialog from "@components/ProfilePage/ProfileFollowersDialog";
import ProfileFollowingsDialog from "@components/ProfilePage/ProfileFollowingsDialog";

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
`;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { UserId, role } = useParams();
  const { me, user } = useSelector(state => state.user);
  const { loadToUserLoading, followLoading, unfollowLoading } = useSelector(state => state.user);
  const [isOpenFollowersDialog, onOpenFollowersDialog, , setIsOpenFollowersDialog] = useOpenClose(false);
  const [isOpenFollowingsDialog, onOpenFollowingsDialog, , setIsOpenFollowingsDialog] = useOpenClose(false);
  const { followDone, followError, unfollowDone, unfollowError } = useSelector(state => state.user);
  const {
    removePostDone,
    removePostError,
    appendLikeToPostDone,
    appendLikeToPostError,
    removeLikeToPostDone,
    removeLikeToPostError,
    appendCommentToPostDone,
    appendCommentToPostError,
    removeCommentToPostDone,
    removeCommentToPostError,
    appendLikeToCommentDone,
    appendLikeToCommentError,
    removeLikeToCommentDone,
    removeLikeToCommentError,
    loadRecommentsError,
  } = useSelector(state => state.post);

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
        me={me}
        user={user}
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

      <ProfileContent role={role} me={me} UserId={UserId} />

      {/* 팔로워들에 대한 다이어로그창 */}
      {isOpenFollowersDialog && (
        <ProfileFollowersDialog
          me={me}
          onCloseFollowersDialog={onCloseFollowersDialog}
          isOpenFollowersDialog={isOpenFollowersDialog}
          onFollow={onFollow}
        />
      )}

      {/* 팔로잉들에 대한 다이어로그창 */}
      {isOpenFollowingsDialog && (
        <ProfileFollowingsDialog
          me={me}
          user={user}
          onCloseFollowingsDialog={onCloseFollowingsDialog}
          isOpenFollowingsDialog={isOpenFollowingsDialog}
          onFollow={onFollow}
        />
      )}

      {/* 성공 메시지 - 토스트 */}
      {(appendCommentToPostDone ||
        removeCommentToPostDone ||
        removePostDone ||
        appendLikeToPostDone ||
        removeLikeToPostDone ||
        appendLikeToCommentDone ||
        removeLikeToCommentDone ||
        followDone ||
        unfollowDone) && (
        <Toast
          message={
            appendCommentToPostDone ||
            removeCommentToPostDone ||
            removePostDone ||
            appendLikeToPostDone ||
            removeLikeToPostDone ||
            appendLikeToCommentDone ||
            removeLikeToCommentDone ||
            followDone ||
            unfollowDone
          }
          success
        />
      )}

      {/* 실패 메시지 - 토스트 */}
      {(appendCommentToPostError ||
        removeCommentToPostError ||
        removePostError ||
        appendLikeToPostError ||
        removeLikeToPostError ||
        appendLikeToCommentError ||
        removeLikeToCommentError ||
        loadRecommentsError ||
        followError ||
        unfollowError) && (
        <Toast
          message={
            appendCommentToPostError ||
            removeCommentToPostError ||
            removePostError ||
            appendLikeToPostError ||
            removeLikeToPostError ||
            appendLikeToCommentError ||
            removeLikeToCommentError ||
            loadRecommentsError ||
            followError ||
            unfollowError
          }
          error
        />
      )}
    </Wrapper>
  );
};

export default ProfilePage;
