import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@src/components/common/Icon";

// type
import { ICON } from "@src/type";
import type { SimpleUser } from "@src/type";
import type { UserState } from "@src/store/reducers";

type Props = {
  likers: SimpleUser[];
  bookmarkers: SimpleUser[];
  onClickPostLikeButton: (isLikedPost: boolean) => () => void;
  isFocus: boolean;
  onClickCommentIconButton: () => void;
  onClickBookmarkButton: (isBookmark: boolean) => () => void;
  onClickDM: () => void;
};

const PostCardButtons = ({
  likers,
  bookmarkers,
  onClickPostLikeButton,
  isFocus,
  onClickCommentIconButton,
  onClickBookmarkButton,
  onClickDM,
}: Props) => {
  const { me } = useSelector(({ user }: { user: UserState }) => user);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [isBookmarkedPost, setIsBookmarkedPost] = useState(false);

  // 2022/01/18 - 본인이 게시글에 좋아요 눌렀는지 확인 - by 1-blue
  useEffect(
    () => setIsLikedPost(likers.some((liker) => liker._id === me?._id)),
    [me, likers]
  );

  // 2022/01/18 - 본인이 게시글에 북마크 눌렀는지 확인 - by 1-blue
  useEffect(
    () =>
      setIsBookmarkedPost(
        bookmarkers.some((bookmarker) => bookmarker._id === me?._id)
      ),
    [me, bookmarkers]
  );

  return (
    <Wrapper>
      {/* 좋아요 */}
      <button
        type="button"
        onClick={onClickPostLikeButton(isLikedPost)}
        className="post-card-buttons-heart"
      >
        <Icon width={24} height={24} icon={ICON.HEART} $fill={isLikedPost} />
      </button>

      {/* 댓글 */}
      <button
        type="button"
        onClick={onClickCommentIconButton}
        className="post-card-buttons-comment"
      >
        <Icon width={24} height={24} icon={ICON.COMMENT} $fill={isFocus} />
      </button>

      {/* DM */}
      <button
        type="button"
        className="post-card-buttons-airplane"
        onClick={onClickDM}
      >
        <Icon width={24} height={24} icon={ICON.AIRPLANE} />
      </button>

      {/* 빈 공간 차지 */}
      <div className="post-card-buttons-empty-place" />

      {/* 북마크 */}
      <button
        type="button"
        onClick={onClickBookmarkButton(isBookmarkedPost)}
        className="post-card-buttons-bookmark"
      >
        <Icon
          width={24}
          height={24}
          icon={ICON.BOOKMARK}
          $fill={isBookmarkedPost}
        />
      </button>
    </Wrapper>
  );
};

export default PostCardButtons;
