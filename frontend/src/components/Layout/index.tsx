import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// components
import WritePostModal from "@src/components/Post/WriteModal";

// actions
import { closeWriteModalRequest } from "@src/store/actions";

// type
import type { PostState } from "@src/store/reducers";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { isShowWritePostModal } = useSelector(
    ({ post }: { post: PostState }) => post
  );

  // 2022/05/19 - 게시글 생성 모달 닫기 - by 1-blue
  const onCloseModal = useCallback(() => {
    dispatch(closeWriteModalRequest());
  }, [dispatch]);

  return (
    <>
      <Wrapper>{children}</Wrapper>

      {/* 게시글 생성 모달 */}
      {isShowWritePostModal && (
        <WritePostModal
          showModal={isShowWritePostModal}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};

export default Layout;
