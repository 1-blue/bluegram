import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Proptypes from "prop-types";

// action
import {
  loadPostAction,
  appendCommentToPostAction,
  removeCommentToPostAction,
  removePostAction,
  appendLikeToPostAction,
  removeLikeToPostAction,
  appendLikeToCommentAction,
  removeLikeToCommentAction,
  loadRecommentsAction,
  followAction,
  unfollowAction,
} from "@store/actions";

// components
import PostHead from "./PostHead";
import PostContent from "./PostContent";
import PostComment from "./PostComment";
import PostButtons from "./PostButtons";
import PostInfo from "./PostInfo";
import PostCommentForm from "./PostCommentForm";
import ImageCarousel from "@components/common/ImageCarousel";
import Spinner from "@components/common/Spinner";

// styled-component
import { Wrapper } from "./style";

const ReadPostModal = forwardRef(({ PostId, onCloseModal }, modalRef) => {
  const dispatch = useDispatch();
  const { post } = useSelector(state => state.post);
  const { me } = useSelector(state => state.user);
  const [recommentData, setRecommentData] = useState({ RecommentId: null, username: null });
  const commentInputRef = useRef(null);

  // 2021/12/24 - 특정 게시글 상세 정보 요청 - by 1-blue
  useEffect(() => dispatch(loadPostAction({ PostId })), []);

  // 2021/12/27 - 댓글 생성 ( using PostCommentForm ) - by 1-blue
  const onAppendComment = useCallback(
    (content, RecommentId) => e => {
      e.preventDefault();

      // 답글인 경우 앞에 @유저명 제외시키는 정규표현식
      const processingContent = content.replace(/^@[\S]*\s/g, "");

      if (!processingContent.trim()) return alert("댓글을 입력한 후에 제출해주세요!");

      dispatch(appendCommentToPostAction({ content: processingContent, PostId, RecommentId }));

      setRecommentData({ RecommentId: null, username: null });
    },
    [PostId],
  );

  // 2021/12/27 - 댓글 삭제 ( using PostComment ) - by 1-blue
  const onRemoveComment = useCallback(
    CommentId => e => {
      e.preventDefault();

      dispatch(removeCommentToPostAction({ CommentId }));
    },
    [],
  );

  // 2021/12/27 - 게시글 삭제 ( using PostHead ) - by 1-blue
  const onRemovePost = useCallback(
    e => {
      e.preventDefault();

      dispatch(removePostAction({ PostId }));
    },
    [PostId],
  );

  // 2021/12/25 - 게시글 좋아요 추가/삭제 요청  ( using PostButtons ) - by 1-blue
  const onClickPostLike = useCallback(() => {
    // 좋아요 제거
    if (post.PostLikers.some(liker => liker._id === me._id)) return dispatch(removeLikeToPostAction({ PostId }));

    // 좋아요 추가
    return dispatch(appendLikeToPostAction({ PostId }));
  }, [post, me]);

  // 2021/12/28 - 댓글 좋아요 추가/삭제 요청 ( using PostComment ) - by 1-blue
  const onClickCommentLike = useCallback(
    (CommentId, isMineCommentLike) => () => {
      // 좋아요 제거
      if (isMineCommentLike) return dispatch(removeLikeToCommentAction({ CommentId }));

      // 좋아요 추가
      return dispatch(appendLikeToCommentAction({ CommentId }));
    },
    [],
  );

  // 2021/12/29 - 댓글의 답글달기 ( using PostComment ) - by 1-blue
  const onChangeRecommentData = useCallback(
    (RecommentId, username) => () => {
      setRecommentData({ RecommentId, username });
    },
    [],
  );

  // 2021/12/30 - 특정 댓글의 답글 불러오기 ( using PostComment ) - by 1-blue
  const onClickLoadRecomment = useCallback(
    CommentId => () => {
      dispatch(loadRecommentsAction({ CommentId }));
    },
    [],
  );

  // 2021/12/30 - 게시글 작성자 팔로우/언팔로우하기 ( using PostHead ) - by 1-blue
  const onFollow = useCallback(
    (isFollow, UserId) => () => {
      if (isFollow) return dispatch(unfollowAction({ UserId }));
      return dispatch(followAction({ UserId }));
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
            <PostHead me={me} post={post} className="post-head-1" onRemovePost={onRemovePost} onFollow={onFollow} />

            {/* image-carousel */}
            <ImageCarousel speed={300} images={post.Images} />

            <div className="post">
              {/* 머리 부분 */}
              <PostHead me={me} post={post} onFollow={onFollow} className="post-head-2" onRemovePost={onRemovePost} />

              <div className="post-scroll">
                {/* 컨텐츠 부분 */}
                <PostContent content={post.content} />

                {/* 댓글 영역 */}
                <ul className="post-comment">
                  {post.Comments.map(comment => (
                    <PostComment
                      key={comment._id}
                      comment={comment}
                      UserId={me._id}
                      onRemoveComment={onRemoveComment}
                      onClickCommentLike={onClickCommentLike}
                      onChangeRecommentData={onChangeRecommentData}
                      onClickLoadRecomment={onClickLoadRecomment}
                    />
                  ))}
                </ul>
              </div>

              {/* 아이콘 버튼 영역 */}
              <PostButtons
                onClickPostLike={onClickPostLike}
                isPostLiked={post?.PostLikers.some(liker => liker._id === me._id)}
                commentInputRef={commentInputRef}
              />

              {/* 좋아요 개수 및 게시글 작성 시간 */}
              <PostInfo PostLikers={post.PostLikers} createdAt={post.createdAt} />

              {/* 댓글 폼 */}
              <PostCommentForm
                PostId={PostId}
                onAppendComment={onAppendComment}
                recommentData={recommentData}
                setRecommentData={setRecommentData}
                commentInputRef={commentInputRef}
              />
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
