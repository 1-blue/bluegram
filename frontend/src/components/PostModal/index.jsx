// 2021/12/22 하나의 게시글 모달 by 1-blue

import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Proptypes from "prop-types";

// action
import { loadPostAction } from "@store/actions";

// components
import PostHead from "./PostHead";
import PostContent from "./PostContent";
import PostComment from "./PostComment";
import PostIconButtons from "./PostIconButtons";
import PostInfo from "./PostInfo";
import PostCommentForm from "./PostCommentForm";
import ImageCarousel from "@components/common/ImageCarousel";

// styled-component
import { Wrapper } from "./style";

const ReadPostModal = forwardRef(({ PostId, onCloseModal }, modalRef) => {
  const dispatch = useDispatch();
  const { post } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(loadPostAction({ PostId }));
  }, []);

  return (
    <Wrapper>
      <button type="button" className="close-modal-button" onClick={onCloseModal}>
        X
      </button>

      <div className="modal" ref={modalRef}>
        {post ? (
          <>
            {post.Images.length === 1 ? (
              <img
                src={process.env.IMAGE_URL + "/" + post.Images[post.Images.length - 1].name}
                alt="게시글의 이미지"
                className="post-image"
              />
            ) : (
              <ImageCarousel speed={300} length={post.Images.length}>
                <li>
                  <img
                    src={process.env.IMAGE_URL + "/" + post.Images[post.Images.length - 1].name}
                    alt="게시글의 이미지"
                  />
                </li>
                {post.Images.map(image => (
                  <li key={image._id}>
                    <img src={process.env.IMAGE_URL + "/" + image.name} alt="게시글의 이미지" />
                  </li>
                ))}
                <li>
                  <img src={process.env.IMAGE_URL + "/" + post.Images[0].name} alt="게시글의 이미지" />
                </li>
              </ImageCarousel>
            )}

            <div className="post">
              {/* 머리 부분 */}
              <PostHead image={post.User.Images[0]} name={post.User.name} />

              <div className="post-scroll">
                {/* 컨텐츠 부분 */}
                <PostContent content={post.content} />

                {/* 댓글 영역 */}
                <PostComment />
              </div>

              {/* 아이콘 버튼 영역 */}
              <PostIconButtons />

              {/* 좋아요 개수 및 게시글 작성 시간 */}
              <PostInfo Likers={post.Likers} updatedAt={post.updatedAt} />

              {/* 댓글 폼 */}
              <PostCommentForm />
            </div>
          </>
        ) : (
          <h1>게시글을 불러오는 중입니다...</h1>
        )}
      </div>
    </Wrapper>
  );
});

ReadPostModal.propTypes = {
  PostId: Proptypes.number.isRequired,
  onCloseModal: Proptypes.func.isRequired,
};

export default ReadPostModal;
