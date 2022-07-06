import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// hooks
import useTextarea from "@src/hooks/useTextarea";

// styled-components
import { Wrapper } from "./style";

// components
import PostCardHead from "./PostCardHead";
import PostCardPhoto from "./PostCardPhoto";
import PostCardButtons from "./PostCardButtons";
import PostCardInfo from "./PostCardInfo";
import PostCardContent from "./PostCardContent";
import PostCardCommentToggleButton from "./PostCardCommentToggleButton";
import PostCardComment from "./PostCardComment";
import PostCardLoadCommentButton from "./PostCardLoadCommentButton";
import PostCardCommentForm from "./PostCardCommentForm";

// action
import { chatActions, postActions, userActions } from "@src/store/reducers";

// type
import type { IPostWithPhotoAndCommentAndLikerAndCount } from "@src/type";
import type { RootState } from "@src/store/configureStore";

type Props = {
  post: IPostWithPhotoAndCommentAndLikerAndCount;
};

const PostCard = ({ post }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    appendLikeToPostLoading,
    removeLikeToPostLoading,
    appendLikeToCommentLoading,
    removeLikeToCommentLoading,
    appendBookmarkLoading,
    removeBookmarkLoading,
  } = useSelector(({ post }: RootState) => post);
  const { me, followLoading, unfollowLoading } = useSelector(
    ({ user }: RootState) => user
  );
  const { addedRoomId } = useSelector(({ chat }: RootState) => chat);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, onChangeText, setText, resize] = useTextarea("");
  const [isShowComment, setIsShowComment] = useState(true);
  const onToggleComment = useCallback(
    () => setIsShowComment((prev) => !prev),
    []
  );

  // 2022/05/21 - 답글일 경우 답글에 대한 정보를 가지는 훅 - by 1-blue
  const [recommentMetadata, setRecommentMetadata] = useState<{
    RecommentId: number | null;
    username: string;
  }>({
    RecommentId: null,
    username: "",
  });
  const [isFocus, setIsFocus] = useState(false);

  // 2022/01/17 - 답글 달기를 눌렀을 경우 답글임을 명시하기 위해 폼에 "@유저명 "을 넣어줌 - by 1-blue
  useEffect(() => {
    if (!recommentMetadata.username) return;
    setText(`@${recommentMetadata.username} `);
  }, [recommentMetadata, setText]);

  // 2022/01/19 - textarea resize - by 1-blue
  const textareaResize = useCallback(
    () => resize(textareaRef),
    [resize, textareaRef]
  );

  // 2022/01/19 - 버튼 아이콘 클릭 시 포커스 부여 - by 1-blue
  const onClickCommentIconButton = useCallback(() => {
    if (!me?._id) return toast.error("로그인후에 접근해주세요!");

    textareaRef.current?.focus();
  }, [me, textareaRef]);

  // 2022/05/29 - DM 클릭 시 채팅방 생성 - by 1-blue
  const onClickDM = useCallback(() => {
    if (!me?._id) return toast.error("로그인후에 접근해주세요!");
    if (me._id === post.UserId)
      return toast.error("본인과 DM을 할 수 없습니다!");

    dispatch(
      chatActions.addRoomRequest({
        UserId: post.UserId,
        roomName: "새로운 채팅방",
      })
    );
  }, [me, dispatch, post]);
  // 2022/05/30 - 생성된 or 존재하는 DM 페이지로 이동 - by 1-blue
  useEffect(() => {
    if (!addedRoomId) return;

    router.push(`/dm/${addedRoomId}`);
  }, [router, addedRoomId]);

  // 2022/01/19 - 답글 달기 버튼 클릭 시 포커스 부여 + 답글에 대한 정보 기록 - by 1-blue
  const onClickRecommentButton = useCallback(
    (RecommentId: number, username: string) => () => {
      if (!me?._id) return toast.error("로그인인후에 접근해주세요");

      setRecommentMetadata({ RecommentId, username });
      textareaRef.current?.focus();
    },
    [me, textareaRef, setRecommentMetadata]
  );

  // 2022/01/17 - 현재 게시글 제거 요청 - by 1-blue
  const onRemovePost = useCallback(
    () => dispatch(postActions.removePostRequest({ PostId: post._id })),
    [dispatch, post]
  );

  // 2022/01/16 - 현재 게시글에 댓글/답글 생성 요청 - by 1-blue
  const onSubmitComment = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 답글이라면 답글 식별자가 들어갈 변수
      let RecommentId = null;

      // 답글인지 판단 후 답글이라면 답글 식별자를 넣어줌
      if (/^@[\S]*\s/g.test(text)) RecommentId = recommentMetadata.RecommentId;

      // 답글인 경우 앞에 "@유저명 " 제외시키는 정규표현식
      const processingContent = text.replace(/^@[\S]*\s/g, "");

      const length = processingContent.trim().length;

      if (length === 0) return toast.error("댓글을 입력하고 제출해주세요!");
      if (length > 200)
        return toast.error(
          `댓글의 최대 길이는 200자입니다.\n( 현재 길이 ${length} )`
        );

      dispatch(
        postActions.appendCommentRequest({
          content: processingContent,
          PostId: post._id,
          RecommentId,
        })
      );

      // textarea 초기화
      setText("");
      textareaResize();
    },
    [dispatch, text, setText, post, recommentMetadata, textareaResize]
  );

  // 2022/01/16 - 현재 게시글에 댓글/답글 삭제 요청 - by 1-blue
  const onRemoveComment = useCallback(
    (CommentId: number) => () =>
      dispatch(postActions.removeCommentRequest({ CommentId })),
    [dispatch]
  );

  // 2022/01/16 - 현재 게시글의 댓글 더 불러오기 - by 1-blue
  const onClickloadMoreComment = useCallback(
    (lastId: number) => () => {
      if (post.Comments[0]?.content) {
        // 한 번 이상 요청하고 추가로 댓글 요청일 경우
        dispatch(
          postActions.loadCommentsRequest({
            PostId: post._id,
            lastId,
            limit: 10,
          })
        );
      } else {
        // 최초 요청일 경우
        dispatch(
          postActions.loadCommentsRequest({
            PostId: post._id,
            lastId: null,
            limit: 10,
          })
        );
      }
    },
    [dispatch, post]
  );

  // 2022/01/17 - 현재 게시글의 특정 댓글의 답글 불러오기 - by 1-blue
  const onClickloadMoreRecomment = useCallback(
    (lastId: number | null, CommentId: number) => () => {
      dispatch(
        postActions.loadRecommentsRequest({ CommentId, lastId, limit: 5 })
      );
    },
    [dispatch]
  );

  // 2022/01/18 - 게시글에 좋아요 추가/제거 - by 1-blue
  const onClickPostLikeButton = useCallback(
    (isLikedPost: boolean) => () => {
      // 비로그인 접근
      if (!me?._id) return toast.error("로그인후에 접근해주세요!");

      // 이미 좋아요 처리중이라면 요청 중지
      if (appendLikeToPostLoading || removeLikeToPostLoading)
        return toast.warning("이미 게시글에 좋아요 요청 처리중입니다.");

      if (isLikedPost) {
        dispatch(postActions.removeLikeToPostRequest({ PostId: post._id }));
      } else {
        dispatch(postActions.appendLikeToPostRequest({ PostId: post._id }));
      }
    },
    [dispatch, me, post, appendLikeToPostLoading, removeLikeToPostLoading]
  );

  // 2022/01/18 - 댓글/답글에 좋아요 추가/제거 - by 1-blue
  const onClickCommentLikeButton = useCallback(
    (isLikedComment: boolean, CommentId: number) => () => {
      // 비로그인 접근
      if (!me?._id) return toast.error("로그인후에 접근해주세요!");

      // 이미 좋아요 처리중이라면 요청 중지
      if (appendLikeToCommentLoading || removeLikeToCommentLoading)
        return toast.error(
          "이미 댓글에 좋아요 요청 처리중입니다.\n잠시후에 다시 시도해주세요"
        );

      if (isLikedComment) {
        dispatch(postActions.removeLikeToCommentRequest({ CommentId }));
      } else {
        dispatch(postActions.appendLikeToCommentRequest({ CommentId }));
      }
    },
    [dispatch, me, appendLikeToCommentLoading, removeLikeToCommentLoading]
  );

  // 2022/01/19 - 팔로우/언팔로우 - by 1-blue
  const onClickFollowButton = useCallback(
    (UserId: number, isFollow: boolean) => () => {
      // 비로그인 접근
      if (!me?._id) return toast.error("로그인후에 접근해주세요!");

      if (followLoading || unfollowLoading)
        return toast.error(
          "이미 팔로우/언팔로우 처리 중입니다.\n잠시후에 다시 시도해주세요!"
        );

      if (isFollow) {
        dispatch(userActions.unfollowRequest({ UserId }));
      } else {
        dispatch(userActions.followRequest({ UserId }));
      }
    },
    [dispatch, me, followLoading, unfollowLoading]
  );

  // 2022/01/23 - 북마크 추가/제거 - by 1-blue
  const onClickBookmarkButton = useCallback(
    (isBookmark: boolean) => () => {
      // 비로그인 접근
      if (!me?._id) return toast.error("로그인후에 접근해주세요!");

      if (appendBookmarkLoading || removeBookmarkLoading)
        return toast.error(
          "이미 북마크 처리중입니다.\n잠시후에 다시 시도해주세요!"
        );

      if (isBookmark) {
        dispatch(postActions.removeBookmarkRequest({ PostId: post._id }));
      } else {
        dispatch(postActions.appendBookmarkRequest({ PostId: post._id }));
      }
    },
    [dispatch, me, post, appendBookmarkLoading, removeBookmarkLoading]
  );

  return (
    <Wrapper>
      {/* 게시글의 머리 부분 ( 작성자, 팔로우, 게시글 옵션 버튼 ) */}
      <PostCardHead
        user={post.User}
        onRemovePost={onRemovePost}
        onClickFollowButton={onClickFollowButton}
      />

      {/* 게시글의 이미지 */}
      <PostCardPhoto photos={post.Photos.map((photo) => photo.name)} />

      {/* 게시글 버튼들 ( 좋아요, 댓글, DM, 북마크 ) */}
      <PostCardButtons
        likers={post.PostLikers}
        bookmarkers={post.PostBookmarks}
        onClickPostLikeButton={onClickPostLikeButton}
        isFocus={isFocus}
        onClickCommentIconButton={onClickCommentIconButton}
        onClickBookmarkButton={onClickBookmarkButton}
        onClickDM={onClickDM}
      />

      {/* 게시글 정보 ( 좋아요 개수, 작성 시간 ) */}
      <PostCardInfo
        likeCount={post.PostLikers.length}
        createdAt={post.createdAt}
      />

      {/* 게시글 내용 */}
      <PostCardContent content={post.content} />

      {/* 게시글의 댓글 토글 버튼 */}
      {post.Comments.length > 0 && !post.hasMoreComments && (
        <PostCardCommentToggleButton
          isShowComment={isShowComment}
          onToggleComment={onToggleComment}
        />
      )}

      {/* 게시글의 댓글들 */}
      {post.Comments[0]?.content &&
        isShowComment &&
        post.Comments.map((comment) => (
          <PostCardComment
            key={comment._id}
            comment={comment}
            onRemoveComment={onRemoveComment}
            onClickloadMoreRecomment={onClickloadMoreRecomment}
            onClickCommentLikeButton={onClickCommentLikeButton}
            onClickRecommentButton={onClickRecommentButton}
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
        ref={textareaRef}
        text={text}
        onChangeText={onChangeText}
        textareaResize={textareaResize}
        onSubmitComment={onSubmitComment}
        setIsFocus={setIsFocus}
      />
    </Wrapper>
  );
};

export default PostCard;
