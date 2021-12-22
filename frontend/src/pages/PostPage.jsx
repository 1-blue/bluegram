// 2021/12/22 게시글 리스트 페이지 by 1-blue

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// action
import { loadPostsAction } from "@store/actions/postAction";

// components
import PostCard from "@components/PostCard";

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 24px;
`;

const PostPage = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(loadPostsAction({ lastId: -1 }));
  }, []);

  if (posts.length === 0) {
    return <h1>게시글이 없거나, 게시글을 불러오는 중입니다...</h1>;
  }

  return (
    <Wrapper>
      {posts.map(post => (
        <PostCard post={post} key={post._id} />
      ))}
    </Wrapper>
  );
};

export default PostPage;
