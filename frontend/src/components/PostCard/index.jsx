/**
 * 생성일: 2022/01/15
 * 수정일: 2022/01/17
 * 작성자: 1-blue
 *
 * 상세 게시글 컴포넌트
 * 게시글 CRD
 * 댓글 CD
 * 답글 CD
 * 댓글 더 불러오기
 * 답글 더 불러오기
 */

import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// components
import PostCardHead from "./PostCardHead";
import PostCardImage from "./PostCardImage";
import PostCardButtons from "./PostCardButtons";
import PostCardInfo from "./PostCardInfo";
import PostCardContent from "./PostCardContent";
import PostCardCommentToggleButton from "./PostCardCommentToggleButton";
import PostCardComment from "./PostCardComment";
import PostCardLoadCommentButton from "./PostCardLoadCommentButton";
import PostCardCommentForm from "./PostCardCommentForm";

// actions
import {
  resetMessageAction,
  removePostAction,
  appendCommentToPostAction,
  removeCommentToPostAction,
  loadCommentsAction,
  loadRecommentsAction,
  appendLikeToPostAction,
  removeLikeToPostAction,
} from "@store/actions";

// hooks
import useTextarea from "@hooks/useTextarea";
import useToggle from "@hooks/useToggle";
import { useEffect } from "react";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText, resize] = useTextarea("");
  const [isShowComment, onToggleComment] = useToggle(true);
  // 2022/01/17 - 답글일 경우 답글에 대한 정보를 가지는 훅 - by 1-blue
  const [recommentData, setRecommentData] = useState({ RecommentId: null, username: "" });

  // 2022/01/17 - 현재 게시글 제거 요청 - by 1-blue
  const onRemovePost = useCallback(() => dispatch(removePostAction({ PostId: post._id })), [post._id]);

  // 2022/01/17 - 답글 달기를 눌렀을 경우 답글임을 명시하기 위해 폼에 "@유저명 "을 넣어줌 - by 1-blue
  useEffect(() => {
    if (!recommentData.username) return;
    setText(`@${recommentData.username} `);
  }, [recommentData]);

  // 2022/01/16 - 현재 게시글에 댓글/답글 생성 요청 - by 1-blue
  const onSubmitComment = useCallback(
    textareaRef => e => {
      e.preventDefault();

      // 답글이라면 답글 식별자가 들어갈 변수
      let RecommentId = null;

      // 답글인지 판단 후 답글이라면 답글 식별자를 넣어줌
      if (/^@[\S]*\s/g.test(text)) RecommentId = recommentData.RecommentId;

      // 답글인 경우 앞에 "@유저명 " 제외시키는 정규표현식
      const processingContent = text.replace(/^@[\S]*\s/g, "");

      const length = processingContent.trim().length;

      if (length === 0) return alert("댓글을 입력하고 제출해주세요!");
      if (length > 200) return alert(`댓글의 최대 길이는 200자입니다.\n( 현재 길이 ${length} )`);

      dispatch(appendCommentToPostAction({ content: processingContent, PostId: post._id, RecommentId }));

      // textarea 초기화
      setText("");
      dispatch(resetMessageAction());
      resize(textareaRef)();
    },
    [text, post._id, resize, recommentData],
  );

  // 2022/01/16 - 현재 게시글에 댓글/답글 삭제 요청 - by 1-blue
  const onRemoveComment = useCallback(CommentId => () => dispatch(removeCommentToPostAction({ CommentId })), []);

  // 2022/01/16 - 현재 게시글의 댓글 더 불러오기 - by 1-blue
  const onClickloadMoreComment = useCallback(
    lastId => () => {
      if (post.Comments[0]?.content) {
        // 한 번 이상 요청하고 추가로 댓글 요청일 경우
        dispatch(loadCommentsAction({ PostId: post._id, lastId, limit: 10 }));
      } else {
        // 최초 요청일 경우
        dispatch(loadCommentsAction({ PostId: post._id, lastId: null, limit: 10 }));
      }
    },
    [post],
  );

  // 2022/01/17 - 현재 게시글의 특정 댓글의 답글 불러오기 - by 1-blue
  const onClickloadMoreRecomment = useCallback(
    (lastId, CommentId) => () => {
      dispatch(loadRecommentsAction({ CommentId, lastId, limit: 5 }));
    },
    [],
  );

  // 2022/01/18 - 게시글에 좋아요 추가/제거 - by 1-blue
  const onClickPostLikeButton = useCallback(
    isLikedPost => () => {
      if (isLikedPost) {
        dispatch(removeLikeToPostAction({ PostId: post._id }));
      } else {
        dispatch(appendLikeToPostAction({ PostId: post._id }));
      }
    },
    [post._id],
  );

  return (
    <Wrapper>
      {/* 게시글의 머리 부분 ( 작성자, 팔로우, 게시글 옵션 버튼 ) */}
      <PostCardHead user={post.User} onRemovePost={onRemovePost} />

      {/* 게시글의 이미지 */}
      <PostCardImage images={post.Images} />

      {/* 게시글 버튼들 ( 좋아요, 댓글, DM, 북마크 ) */}
      <PostCardButtons likers={post.PostLikers} onClickPostLikeButton={onClickPostLikeButton} />

      {/* 게시글 정보 ( 좋아요 개수, 작성 시간 ) */}
      <PostCardInfo likeCount={post.PostLikers.length} createdAt={post.createdAt} />

      {/* 게시글 내용 */}
      <PostCardContent content={post.content} />

      {/* 게시글의 댓글 토글 버튼 */}
      {post.Comments.length > 0 && !post.hasMoreComments && (
        <PostCardCommentToggleButton isShowComment={isShowComment} onToggleComment={onToggleComment} />
      )}

      {/* 게시글의 댓글들 */}
      {post.Comments[0]?.content &&
        isShowComment &&
        post.Comments.map(comment => (
          <PostCardComment
            key={comment._id}
            comment={comment}
            onRemoveComment={onRemoveComment}
            onClickloadMoreRecomment={onClickloadMoreRecomment}
            setRecommentData={setRecommentData}
          />
        ))}

      {/* 게시글의 댓글 더 불러오기 버튼 */}
      {post.Comments.length > 0 && post.hasMoreComments && (
        <PostCardLoadCommentButton
          Comments={post.Comments}
          allCommentCount={post.allCommentCount}
          onClickloadMoreComment={onClickloadMoreComment}
        />
      )}

      {/* 게시글의 댓글 입력 폼 */}
      <PostCardCommentForm
        user={post.User}
        text={text}
        onChangeText={onChangeText}
        resize={resize}
        onSubmitComment={onSubmitComment}
        recommentData={recommentData}
      />
    </Wrapper>
  );
};

PostCard.propTypes = {
  post: Proptypes.shape({
    _id: Proptypes.number,
    content: Proptypes.string,
    createdAt: Proptypes.string,
    User: Proptypes.shape({
      _id: Proptypes.number,
      name: Proptypes.string,
      Images: Proptypes.arrayOf(
        Proptypes.shape({
          _id: Proptypes.number,
          name: Proptypes.string,
        }),
      ),
    }),
    Images: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
        name: Proptypes.string,
      }),
    ),
    Comments: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
        content: Proptypes.string,
        createdAt: Proptypes.string,
        UserId: Proptypes.number,
        User: Proptypes.shape({
          _id: Proptypes.number,
          name: Proptypes.string,
          Images: Proptypes.arrayOf(
            Proptypes.shape({
              _id: Proptypes.number,
              name: Proptypes.string,
            }),
          ),
        }),
        CommentLikers: Proptypes.arrayOf(
          Proptypes.shape({
            _id: Proptypes.number,
          }),
        ),
        Recomments: Proptypes.arrayOf(
          Proptypes.shape({
            _id: Proptypes.number,
          }),
        ),
      }),
    ),
    PostLikers: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
      }),
    ),
  }).isRequired,
};

export default PostCard;
