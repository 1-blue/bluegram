import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// action
import { loadPostsAction, resetPostAction, resetPostsAction } from "@store/actions/postAction";

// components
import PostCard from "@components/PostCard";
import PostModal from "@components/PostModal";
import Spinner from "@components/common/Spinner";

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 12px;

  @media (max-width: 480px) {
    gap: 2px;
    grid-template-columns: repeat(1, auto);
  }
  @media (min-width: 480px) and (max-width: 768px) {
    gap: 4px;
    grid-template-columns: repeat(2, auto);
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 8px;
  }
  @media (min-width: 1024px) and (max-width: 1600px) {
    gap: 10px;
  }
`;

const ExplorePage = () => {
  const dispatch = useDispatch();
  const { posts, isMorePosts, loadPostsLoading } = useSelector(state => state.post);
  const [showModal, setShowModal] = useState(false);
  const [openPostId, setOpenPostId] = useState(null);
  const modalRef = useRef(null);

  // 2022/01/02 - 해당 페이지 들어올 때 게시글들 초기화 - by 1-blue
  // 2021/12/21 - 전체 게시글 요청 - by 1-blue
  useEffect(() => {
    dispatch(resetPostsAction());
    dispatch(loadPostsAction({ lastId: -1, limit: 15 }));
  }, []);

  // 2021/12/21 - 다른 영역 클릭 시 모달 닫기 이벤트 - by 1-blue
  const handleCloseModal = useCallback(
    e => {
      /**
       * 바로 아랫부분 추가한 이유는 게시글 모달창 내부에서 좋아요 같은 아이콘을 누르게 되면 즉시 다른 아이콘으로 변경해 줌
       * ex) heart 아이콘 ==> fillHeart 아이콘
       * 이때 문제가 발생하는 게 누르는 즉시 아이콘을 변경시키므로 이벤트 버블링이 돼서 widdow에서 click 이벤트를 받기 전에
       * 아이콘이 변경되어버림... 그래서 모달창 내부에 있는 태그임에도 불구하고 누르면 영역 외의 태그라고 판단해서 모달창이 닫히기 때문에
       * 아이콘은 특별처리로 눌러도 모달창이 닫히지 않도록 해주는 코드임
       */
      if (e.target.nodeName === "path" || e.target.nodeName === "svg" || e.target.nodeName === "LI") return;

      if (showModal && !modalRef.current?.contains(e.target)) {
        setShowModal(false);
        dispatch(resetPostAction());
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

  // 2022/01/02 - 무한스크롤링 이벤트 함수 - by 1-blue
  const scrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 400 &&
      isMorePosts &&
      !loadPostsLoading
    ) {
      dispatch(loadPostsAction({ lastId: posts[posts.length - 1]._id, limit: 15 }));
    }
  }, [posts.length, isMorePosts, loadPostsLoading]);

  // 2022/01/02 - 무한스크롤링 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);

    return () => window.removeEventListener("scroll", scrollEvent);
  }, [scrollEvent]);

  if (posts.length === 0) {
    return <Spinner page />;
  }

  return (
    <>
      <Wrapper>
        {posts.map(post => (
          <PostCard key={post._id} post={post} onOpenModal={onOpenModal} />
        ))}
      </Wrapper>

      {loadPostsLoading && <Spinner page />}

      {showModal && <PostModal PostId={openPostId} onCloseModal={onCloseModal} ref={modalRef} />}
    </>
  );
};

export default ExplorePage;
