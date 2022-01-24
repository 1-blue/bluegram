/* eslint-disable prettier/prettier */

import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

// redux + redux-saga
import wrapper from "@store/configureStore";

// css
import "@css/reset.css";
import "@css/common.css";
import "@css/animation.css";

// components
import Scroll from "@components/Scroll";
import TopNavigationBar from "@components/NavigationBar/TopNavigationBar";
import BottomNavigationBar from "@components/NavigationBar/BottomNavigationBar";
import Layout from "@components/Layout";
import Footer from "@components/Footer";
import SideBar from "@components/SideBar";
import Toast from "@components/common/Toast";

const App = ({ Component, pageProps }) => {
  const [width, setWidth] = useState(0);

  // 토스트 메시지들
  const {
    followDone, followError,
    unfollowDone, unfollowError,
    loadFollowersDone, loadFollowersError,
    loadFollowingsDone, loadFollowingsError,
    loadToUserDone, loadToUserError,
    editToMeAllDone, editToMeAllError,
  } = useSelector(state => state.user);
  const {
    loadPostsDone, loadPostsError,
    loadPostDone, loadPostError,
    loadHashtagPostsDone, loadHashtagPostsError,
    loadPostsOfUserDone, loadPostsOfUserError,
    loadDetailPostsDone, loadDetailPostsError,
    createPostDone, createPostError,
    removePostDone, removePostError,
    appendLikeToPostDone, appendLikeToPostError,
    removeLikeToPostDone, removeLikeToPostError,
    appendCommentToPostDone, appendCommentToPostError,
    removeCommentToPostDone, removeCommentToPostError,
    appendLikeToCommentDone, appendLikeToCommentError,
    removeLikeToCommentDone, removeLikeToCommentError,
    loadCommentsDone, loadCommentsError,
    loadRecommentsDone, loadRecommentsError,
    appendPostOfBookmarkDone, appendPostOfBookmarkError,
    removePostOfBookmarkDone, removePostOfBookmarkError,
    loadPostsOfBookmarkDone, loadPostsOfBookmarkError,
  } = useSelector(state => state.post);

  // 2022/01/13 - 창 넓이 구하기 - by 1-blue
  const resize = useCallback(() => setWidth(window.innerWidth), []);
  useEffect(() => {
    setTimeout(resize, 0);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener(resize);
  }, [resize]);

  return (
    <>
      {/* scroll */}
      <Scroll />

      {/* nav*/}
      {width > 1024 ? <TopNavigationBar /> : <BottomNavigationBar />}

      {/* main */}
      <Layout>
        <Component {...pageProps} />
      </Layout>

      {/* footer */}
      <Footer />

      {/* side-bar */}
      <SideBar />

      {/* 성공 토스트 메시지 */}
      {(
        // 유저 관련
        followDone || unfollowDone || loadFollowersDone || loadFollowingsDone ||
        loadToUserDone || editToMeAllDone ||

        // 게시글 관련
        loadPostsDone || loadPostDone || loadHashtagPostsDone || loadPostsOfUserDone ||
        loadDetailPostsDone || createPostDone || removePostDone || appendLikeToPostDone ||
        removeLikeToPostDone || appendCommentToPostDone || removeCommentToPostDone || appendLikeToCommentDone ||
        removeLikeToCommentDone || appendPostOfBookmarkDone || loadCommentsDone || loadRecommentsDone ||
        removePostOfBookmarkDone || loadPostsOfBookmarkDone) && (
        <Toast
          message={
            followDone || unfollowDone || loadFollowersDone || loadFollowingsDone ||
            loadToUserDone || editToMeAllDone ||
            loadPostsDone || loadPostDone || loadHashtagPostsDone || loadPostsOfUserDone ||
            loadDetailPostsDone || createPostDone || removePostDone || appendLikeToPostDone ||
            removeLikeToPostDone || appendCommentToPostDone || removeCommentToPostDone || appendLikeToCommentDone ||
            removeLikeToCommentDone || appendPostOfBookmarkDone || loadCommentsDone || loadRecommentsDone ||
            removePostOfBookmarkDone || loadPostsOfBookmarkDone
          }
          $success
        />
      )}

      {/* 실패 토스트 메시지 */}
      {(
        followError || unfollowError || loadFollowersError || loadFollowingsError ||
        loadToUserError || editToMeAllError ||
        loadPostsError || loadPostError || loadHashtagPostsError || loadPostsOfUserError ||
        loadDetailPostsError || createPostError || removePostError || appendLikeToPostError ||
        removeLikeToPostError || appendCommentToPostError || removeCommentToPostError || appendLikeToCommentError ||
        removeLikeToCommentError || appendPostOfBookmarkError || loadCommentsError || loadRecommentsError ||
        removePostOfBookmarkError || loadPostsOfBookmarkError) && (
        <Toast
          message={
            followError || unfollowError || loadFollowersError || loadFollowingsError ||
            loadToUserError || editToMeAllError ||
            loadPostsError || loadPostError || loadHashtagPostsError || loadPostsOfUserError ||
            loadDetailPostsError || createPostError || removePostError || appendLikeToPostError ||
            removeLikeToPostError || appendCommentToPostError || removeCommentToPostError || appendLikeToCommentError ||
            removeLikeToCommentError || appendPostOfBookmarkError || loadCommentsError || loadRecommentsError ||
            removePostOfBookmarkError || loadPostsOfBookmarkError
          }
          $error
        />
      )}
    </>
  );
};

App.propTypes = {
  pageProps: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
};

export default wrapper.withRedux(App);
