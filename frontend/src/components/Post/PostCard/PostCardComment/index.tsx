import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@src/components/common/Avatar";
import Icon from "@src/components/common/Icon";
import Menu from "@src/components/common/Menu";

// components
import PostCardRecomment from "./PostCardRecomment";
import PostCardLoadRecommentButton from "./PostCardLoadRecommentButton";
import PostCardCommentToggleButton from "../PostCardCommentToggleButton";

// utils
import { timeFormat } from "@src/libs/dateFormat";

// type
import { ICON } from "@src/type";
import type { ICommentWithUserAndRecommentAndLiker } from "@src/type";
import type { RemoveCommentBody } from "@src/store/types";
import type { UserState } from "@src/store/reducers";

type Props = {
  comment: ICommentWithUserAndRecommentAndLiker & {
    allRecommentCount: number;
  };
  onRemoveComment: (CommentId: number) => () => {
    type: "REMOVE_COMMENT_REQUEST";
    data: RemoveCommentBody;
  };
  onClickloadMoreRecomment: (
    lastId: number | null,
    CommentId: number
  ) => () => void;
  onClickCommentLikeButton: (
    isLikedComment: boolean,
    CommentId: number
  ) => () => void;
  onClickRecommentButton: (RecommentId: number, username: string) => () => void;
};

const PostCardComment = ({
  comment,
  onRemoveComment,
  onClickloadMoreRecomment,
  onClickCommentLikeButton,
  onClickRecommentButton,
}: Props) => {
  const { me } = useSelector(({ user }: { user: UserState }) => user);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const onOpenMenu = useCallback(() => setIsShowMenu(true), [setIsShowMenu]);
  const onCloseMenu = useCallback(() => setIsShowMenu(false), [setIsShowMenu]);
  const [isShowRecomment, setIsShowRecomment] = useState(true);
  const onToggleComment = useCallback(
    () => setIsShowRecomment((prev) => !prev),
    [setIsShowRecomment]
  );
  const [isMine, setIsMine] = useState(false);
  const [isLikedComment, setIsLikedComment] = useState(false);

  // 2022/01/18 - 본인 댓글인지 판단 - by 1-blue
  useEffect(
    () => setIsMine(comment.User._id === me?._id),
    [comment.User._id, me]
  );

  // 2022/01/18 - 댓글에 좋아요 눌렀는지 판단 - by 1-blue
  useEffect(
    () =>
      setIsLikedComment(
        comment.CommentLikers.some((liker) => liker._id === me?._id)
      ),
    [comment.CommentLikers, me]
  );

  return (
    <Wrapper className="post-card-comment-wrapper">
      <li className="post-card-comment">
        {/* 작성자의 프로필 이미지 */}
        <Link href={`/profile/${comment.User._id}`}>
          <a>
            <Avatar
              width={30}
              height={30}
              photo={comment.User.Photos?.[0].name}
              alt="댓글 유저의 프로필 이미지"
              // className="post-card-comment-avatar"
            />
          </a>
        </Link>

        {/* 댓글의 컨텐츠 wrapper */}
        <div className="post-card-comment-content-wrapper">
          {/* 작성자명, 작성내용 */}
          <div className="post-card-comment-content">
            <Link href={`/profile/${comment.User._id}`}>
              <a>
                <span className="post-card-comment-user-name">
                  {comment.User.name}
                </span>
              </a>
            </Link>
            <span className="post-card-comment-text">{comment.content}</span>
          </div>

          {/* 댓글의 추가 정보 및 버튼 */}
          <div className="post-card-comment-info">
            <span className="post-card-comment-created-at">
              {timeFormat(comment.createdAt)}
            </span>
            <button type="button" className="post-card-comment-like-button">
              {comment.CommentLikers.length > 0 && (
                <b>좋아요 {comment.CommentLikers.length}개</b>
              )}
            </button>
            <button
              type="button"
              className="post-card-comment-recomment-button"
              onClick={onClickRecommentButton(comment._id, comment.User.name)}
            >
              <b>답글 달기</b>
            </button>
          </div>
        </div>

        {/* 댓글 좋아요 버튼 */}
        <div className="post-card-comment-buttons">
          <button
            type="button"
            className="post-card-comment-option-button"
            onClick={onOpenMenu}
          >
            <Icon width={16} height={16} icon={ICON.H_OPTION} />
          </button>
          <button
            type="button"
            className="post-card-comment-heart-button"
            onClick={onClickCommentLikeButton(isLikedComment, comment._id)}
          >
            <Icon
              width={16}
              height={16}
              icon={ICON.HEART}
              $fill={isLikedComment}
            />
          </button>
        </div>

        {/* 댓글 옵션 메뉴 */}
        {isShowMenu && (
          <Menu $comment onCloseMenu={onCloseMenu}>
            {isMine && (
              <li className="menu-list" onClick={onRemoveComment(comment._id)}>
                삭제
              </li>
            )}
            <li className="menu-list">신고</li>
            <li className="menu-list">숨기기</li>
          </Menu>
        )}
      </li>

      {/* 답글 토글 버튼 */}
      {comment.Recomments.length > 0 && !comment.hasMoreRecomments && (
        <PostCardCommentToggleButton
          isShowComment={isShowRecomment}
          onToggleComment={onToggleComment}
          $recomment
        />
      )}

      {/* 답글 더 보기 버튼 */}
      {comment.Recomments.length > 0 && comment.hasMoreRecomments && (
        <PostCardLoadRecommentButton
          allRecommentCount={comment.allRecommentCount}
          Recomments={comment.Recomments}
          CommentId={comment._id}
          onClickloadMoreRecomment={onClickloadMoreRecomment}
        />
      )}

      {/* 답글 */}
      {comment.Recomments[0]?.content &&
        isShowRecomment &&
        comment.Recomments.map((recomment) => (
          <PostCardRecomment
            key={recomment._id}
            recomment={recomment}
            onRemoveComment={onRemoveComment}
            onClickCommentLikeButton={onClickCommentLikeButton}
          />
        ))}
    </Wrapper>
  );
};

export default PostCardComment;
