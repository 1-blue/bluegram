/**
 * 생성일: 2022/01/23
 * 수정일: -
 * 작성자: 1-blue
 *
 * 프로필 페이지 북마크된 게시글들
 */

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// actions
import { loadPostsOfBookmarkAction } from "@store/actions";

// common-components
import Spinner from "@components/common/Spinner";
import Text from "@components/common/Text";

// components
import PostCard from "@components/PostCard";

const ProfilePostBookmarkCard = ({ id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector(state => state.user);
  const { postsOfDetail: posts, hasMorePostsOfDetail, loadPostsOfBookmarkLoading } = useSelector(state => state.post);

  useEffect(() => {
    if (me._id !== +id) {
      alert("접근권한이 없습니다.\n기본 프로필 페이지로 이동합니다.");
      router.push(`/profile/${id}`);
    }
  }, [id]);

  // 2022/01/17 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 400 &&
      hasMorePostsOfDetail &&
      !loadPostsOfBookmarkLoading
    ) {
      dispatch(loadPostsOfBookmarkAction({ UserId: id, lastId: posts[posts.length - 1]._id, limit: 8 }));
    }
  }, [posts.length, hasMorePostsOfDetail, loadPostsOfBookmarkLoading, id]);

  // 2022/01/17 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  if (me._id !== +id) return <h2>접근 권한이 없습니다.</h2>;

  return (
    <Wrapper>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* 게시글 추가 로드 */}
      {loadPostsOfBookmarkLoading && <Spinner $page />}

      {!hasMorePostsOfDetail && <Text $postEnd>더 이상 불러올 게시글이 존재하지 않습니다...</Text>}
    </Wrapper>
  );
};

ProfilePostBookmarkCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProfilePostBookmarkCard;
