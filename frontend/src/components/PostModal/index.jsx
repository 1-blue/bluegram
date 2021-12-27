import React, { forwardRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Proptypes from "prop-types";

// action
import {
  loadPostAction,
  resetMessageAction,
  appendCommentToPostAction,
  removeCommentToPostAction,
} from "@store/actions";

// components
import PostHead from "./PostHead";
import PostContent from "./PostContent";
import PostComment from "./PostComment";
import PostIconButtons from "./PostIconButtons";
import PostInfo from "./PostInfo";
import PostCommentForm from "./PostCommentForm";
import ImageCarousel from "@components/common/ImageCarousel";
import Spinner from "@components/common/Spinner";

// styled-component
import { Wrapper } from "./style";

const ReadPostModal = forwardRef(({ PostId, onCloseModal }, modalRef) => {
  const dispatch = useDispatch();
  const { appendCommentToPostDone, appendCommentToPostError, removeCommentToPostDone, removeCommentToPostError } =
    useSelector(state => state.post);
  const { post } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);

  // 2021/12/24 - 특정 게시글 상세 정보 요청 - by 1-blue
  useEffect(() => {
    dispatch(loadPostAction({ PostId }));
  }, []);

  // 2021/12/27 - 게시글의 댓글 생성 성공 시 메시지 / 게시글의 댓글 생성 실패 시 메시지 - by 1-blue
  useEffect(() => {
    if (!(appendCommentToPostDone || appendCommentToPostError)) return;

    alert(appendCommentToPostDone || appendCommentToPostError);

    dispatch(resetMessageAction());
  }, [appendCommentToPostDone, appendCommentToPostError]);

  // 2021/12/27 - 게시글의 댓글 제거 성공 시 메시지 / 게시글의 댓글 제거 실패 시 메시지 - by 1-blue
  useEffect(() => {
    if (!(removeCommentToPostDone || removeCommentToPostError)) return;

    alert(removeCommentToPostDone || removeCommentToPostError);

    dispatch(resetMessageAction());
  }, [removeCommentToPostDone, removeCommentToPostError]);

  // 2021/12/27 - 댓글 생성 ( using PostCommentForm ) - by 1-blue
  const onAppendComment = useCallback(
    (content, CommentId) => e => {
      e.preventDefault();

      if (!content.trim()) return alert("댓글을 입력한 후에 제출해주세요!");

      dispatch(appendCommentToPostAction({ content, PostId, CommentId }));
    },
    [PostId],
  );

  // 2021/12/27 - 댓글 삭제 ( using PostCommentForm ) - by 1-blue
  const onRemoveComment = useCallback(
    CommentId => e => {
      e.preventDefault();

      dispatch(removeCommentToPostAction({ CommentId }));
    },
    [],
  );

  return (
    <Wrapper>
      <button type="button" className="close-modal-button" onClick={onCloseModal}>
        X
      </button>

      <div className="modal" ref={modalRef}>
        {post ? (
          <>
            {/* 머리 부분 */}
            <PostHead
              image={post.User.Images[0]}
              name={post.User.name}
              className="post-head-1"
              isMine={post.User._id === me._id}
            />

            {/* image-carousel */}
            <ImageCarousel speed={300} length={post.Images.length}>
              {post.Images.map(image => (
                <li key={image._id}>
                  <img src={process.env.IMAGE_URL + "/" + image.name} alt="게시글의 이미지" />
                </li>
              ))}
            </ImageCarousel>

            <div className="post">
              {/* 머리 부분 */}
              <PostHead
                image={post.User.Images[0]}
                name={post.User.name}
                className="post-head-2"
                isMine={post.User._id === me._id}
              />

              <div className="post-scroll">
                {/* 컨텐츠 부분 */}
                <PostContent content={post.content} />

                {/* 댓글 영역 */}
                <ul className="post-comment">
                  {post.Comments.map(comment => (
                    <PostComment
                      key={comment._id}
                      comment={comment}
                      isMine={comment.User._id === me._id}
                      onRemoveComment={onRemoveComment}
                    />
                  ))}
                </ul>
              </div>

              {/* 아이콘 버튼 영역 */}
              <PostIconButtons PostId={PostId} />

              {/* 좋아요 개수 및 게시글 작성 시간 */}
              <PostInfo Likers={post.Likers} createdAt={post.createdAt} />

              {/* 댓글 폼 */}
              <PostCommentForm PostId={PostId} onAppendComment={onAppendComment} />
            </div>
          </>
        ) : (
          <Spinner modal />
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
