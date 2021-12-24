import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// action
import { loadPostsAction } from "@store/actions/postAction";

// components
import PostCard from "@components/PostCard";
import PostModal from "@components/PostModal";

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 12px;

  @media (max-width: 480px) {
    gap: 2px;
  }
  @media (min-width: 480px) and (max-width: 768px) {
    gap: 4px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 8px;
  }
  @media (min-width: 1024px) and (max-width: 1600px) {
    gap: 10px;
  }
`;

const PostPage = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);
  const [showModal, setShowModal] = useState(false);
  const [openPostId, setOpenPostId] = useState(null);
  const modalRef = useRef(null);

  // 2021/12/21 - 전체 게시글 요청 - by 1-blue
  useEffect(() => {
    dispatch(loadPostsAction({ lastId: -1 }));
  }, []);

  // 2021/12/21 - 다른 영역 클릭 시 모달 닫기 이벤트 - by 1-blue
  const handleCloseModal = useCallback(
    e => {
      if (showModal && !modalRef.current?.contains(e.target)) {
        setShowModal(false);
      }
    },
    [showModal],
  );

  // 2021/12/21 - 다른 영역 클릭 시 모달 닫기 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", handleCloseModal);

    return () => window.removeEventListener("click", handleCloseModal);
  }, [handleCloseModal]);

  // 2021/12/22 - 클릭 시 모달 열기 및 열린 게시글의 식별자 기록 - by 1-blue
  const onOpenModal = useCallback(
    PostId => () => {
      setShowModal(true);
      setOpenPostId(PostId);
    },
    [],
  );
  // 2021/12/22 - 클릭 시 모달 닫기 - by 1-blue
  const onCloseModal = useCallback(() => setShowModal(false), [showModal]);

  if (posts.length === 0) {
    return <h1>게시글이 없거나, 게시글을 불러오는 중입니다...</h1>;
  }

  return (
    <>
      <Wrapper>
        {posts.map(post => (
          <PostCard key={post._id} post={post} onOpenModal={onOpenModal} />
        ))}
      </Wrapper>

      {showModal && <PostModal PostId={openPostId} onCloseModal={onCloseModal} ref={modalRef} />}
    </>
  );
};

export default PostPage;
