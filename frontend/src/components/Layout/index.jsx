/**
 * 생성일: 2022/01/14
 * 수정일: -
 * 작성자: 1-blue
 *
 * 모든 페이지 공통 레이아웃
 * 여기에 CreatePostModal을 넣어둔 이유는 마땅히 넣을 곳이 없어서 넣었음
 * 모든 페이지에서 게시글 생성에 접근이 가능해서 공통 컴포넌트 중 어딘가 넣어야 한다고 생각했음
 * 그래서 _app과 Layout 중에 고민하다가 Layout이 좀 더 적합하다고 판단해서 넣음
 */

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// components
import CreatePostModal from "@components/CreatePostModal";

// actions
import { closeCreatePostModalAction } from "@store/actions";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { showCreatePostModal } = useSelector(state => state.post);

  // 2022/01/14 - 게시글 생성 모달 닫기 - by 1-blue
  const onCloseModal = useCallback(() => dispatch(closeCreatePostModalAction()), []);

  return (
    <>
      <Wrapper>{children}</Wrapper>

      {/* 게시글 생성 모달 */}
      {showCreatePostModal && <CreatePostModal showModal={showCreatePostModal} onCloseModal={onCloseModal} />}
    </>
  );
};

export default AppLayout;
