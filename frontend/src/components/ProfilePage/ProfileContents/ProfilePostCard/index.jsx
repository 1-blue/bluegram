import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// actions
import { loadPostsDetailOfUserAction } from "@store/actions";

// common-components
import Spinner from "@components/common/Spinner";
import Text from "@components/common/Text";

// components
import PostCard from "@components/PostCard";

const ProfilePostCard = ({ id }) => {
  const dispatch = useDispatch();
  const { postsOfDetail: posts, hasMorePostsOfDetail, loadPostsDetailOfUserLoading } = useSelector(state => state.post);

  // 2022/01/17 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 400 &&
      hasMorePostsOfDetail &&
      !loadPostsDetailOfUserLoading
    ) {
      dispatch(loadPostsDetailOfUserAction({ UserId: id, lastId: posts[posts.length - 1]._id, limit: 8 }));
    }
  }, [posts.length, hasMorePostsOfDetail, loadPostsDetailOfUserLoading, id]);

  // 2022/01/17 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  return (
    <Wrapper>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* 게시글 추가 로드 */}
      {loadPostsDetailOfUserLoading && <Spinner $page />}

      {!hasMorePostsOfDetail && <Text $postEnd>더 이상 불러올 게시글이 존재하지 않습니다...</Text>}
    </Wrapper>
  );
};

ProfilePostCard.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProfilePostCard;
