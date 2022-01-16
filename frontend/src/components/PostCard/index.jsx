import React, { useCallback } from "react";
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
import PostCardComment from "./PostCardComment";
import PostCardLoadCommentButton from "./PostCardLoadCommentButton";
import PostCardCommentForm from "./PostCardCommentForm";

// actions
import {
  resetMessageAction,
  loadCommentsAction,
  appendCommentToPostAction,
  removeCommentToPostAction,
} from "@store/actions";

// hooks
import useTextarea from "@hooks/useTextarea";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText, resize] = useTextarea("");

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

  // 2022/01/16 - 현재 게시글에 댓글 추가 요청 - by 1-blue
  const onSubmitComment = useCallback(
    (RecommentId, textareaRef) => e => {
      e.preventDefault();
      const length = text.trim().length;

      if (length === 0) return alert("댓글을 입력하고 제출해주세요!");
      if (length > 200) return alert(`댓글의 최대 길이는 200자입니다.\n( 현재 길이 ${length} )`);

      dispatch(appendCommentToPostAction({ content: text, PostId: post._id, RecommentId }));

      // textarea 초기화
      setText("");
      dispatch(resetMessageAction());
      resize(textareaRef)();
    },
    [text, post._id, resize],
  );

  // 2022/01/16 - 현재 게시글에 댓글 삭제 요청 - by 1-blue
  const onRemoveComment = useCallback(CommentId => () => dispatch(removeCommentToPostAction({ CommentId })), []);

  return (
    <Wrapper>
      <PostCardHead user={post.User} />
      <PostCardImage images={post.Images} />
      <PostCardButtons />
      <PostCardInfo likeCount={post.PostLikers.length} createdAt={post.createdAt} />
      <PostCardContent content={post.content} />
      {post.Comments[0]?.content &&
        post.Comments.map(comment => (
          <PostCardComment key={comment._id} comment={comment} onRemoveComment={onRemoveComment} />
        ))}
      {post.Comments.length > 0 && post.hasMoreComments && (
        <PostCardLoadCommentButton
          Comments={post.Comments}
          allCommentCount={post.allCommentCount}
          onClickloadMoreComment={onClickloadMoreComment}
        />
      )}
      <PostCardCommentForm
        user={post.User}
        text={text}
        onChangeText={onChangeText}
        resize={resize}
        onSubmitComment={onSubmitComment}
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
