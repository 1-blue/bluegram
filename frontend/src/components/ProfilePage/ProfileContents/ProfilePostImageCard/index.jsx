/**
 * 생성일: 2022/01/23
 * 수정일: -
 * 작성자: 1-blue
 *
 * 프로필 페이지 현재 유저의 게시글 보기
 */

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Text from "@components/common/Text";
import Spinner from "@components/common/Spinner";

// components
import PostImageCard from "@components/PostImageCard";

// actions
import { loadPostsOfUserAction } from "@store/actions";

const ProfilePostImageCard = ({ id }) => {
  const dispatch = useDispatch();
  const { posts, hasMorePosts, loadPostsOfUserLoading } = useSelector(state => state.post);

  // 2022/01/20 - 무한 스크롤링 이벤트 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 400 &&
      hasMorePosts &&
      !loadPostsOfUserLoading
    ) {
      dispatch(loadPostsOfUserAction({ UserId: id, lastId: posts[posts.length - 1]._id, limit: 15 }));
    }
  }, [posts.length, hasMorePosts, loadPostsOfUserLoading, id]);

  // 2022/01/20 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  return (
    <>
      <Wrapper>
        {posts.map(post => (
          <PostImageCard key={post._id} post={post} />
        ))}
      </Wrapper>

      {loadPostsOfUserLoading && <Spinner $page />}

      {!hasMorePosts && <Text $postEnd>더 이상 불러올 게시글이 존재하지 않습니다...</Text>}
    </>
  );
};

ProfilePostImageCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProfilePostImageCard;
