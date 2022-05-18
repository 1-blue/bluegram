import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// components
// import CreatePostModal from "@components/CreatePostModal";

// actions
// import { closeCreatePostModalAction } from "@store/actions";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  // const { showCreatePostModal } = useSelector((state) => state.post);

  // 2022/01/14 - 게시글 생성 모달 닫기 - by 1-blue
  // const onCloseModal = useCallback(
  //   () => dispatch(closeCreatePostModalAction()),
  //   []
  // );

  return (
    <>
      <Wrapper>{children}</Wrapper>

      {/* 게시글 생성 모달 */}
      {/* {showCreatePostModal && (
        <CreatePostModal
          showModal={showCreatePostModal}
          onCloseModal={onCloseModal}
        />
      )} */}
    </>
  );
};

export default Layout;
