import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@src/components/common/Avatar";
import Icon from "@src/components/common/Icon";
import Menu from "@src/components/common/Menu";

// utils
import { timeFormat } from "@src/libs/dateFormat";

// type
import { ICON } from "@src/type";
import type { SimpleUser } from "@src/type";
import type { UserState } from "@src/store/reducers";
import type { RemoveCommentBody } from "@src/store/types";

type Props = {
  recomment: {
    _id: number;
    content: string;
    createdAt: Date;
    User: SimpleUser;
    CommentLikers: {
      _id: number;
      name: string;
    }[];
  };
  onRemoveComment: (CommentId: number) => () => {
    type: "REMOVE_COMMENT_REQUEST";
    data: RemoveCommentBody;
  };
  onClickCommentLikeButton: (
    isLikedComment: boolean,
    CommentId: number
  ) => () => void;
};

const PostCardRecomment = ({
  recomment,
  onRemoveComment,
  onClickCommentLikeButton,
}: Props) => {
  const { me } = useSelector(({ user }: { user: UserState }) => user);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const onOpenMenu = useCallback(() => setIsShowMenu(true), [setIsShowMenu]);
  const onCloseMenu = useCallback(() => setIsShowMenu(false), [setIsShowMenu]);
  const [isMine, setIsMine] = useState(false);
  const [isLikedRecomment, setIsLikedRecomment] = useState(false);

  // 2022/01/18 - 본인 답글인지 판단 - by 1-blue
  useEffect(() => setIsMine(recomment.User._id === me?._id), [recomment, me]);

  // 2022/01/18 - 댓글에 좋아요 눌렀는지 판단 - by 1-blue
  useEffect(
    () =>
      setIsLikedRecomment(
        recomment.CommentLikers.some((liker) => liker._id === me?._id)
      ),
    [recomment.CommentLikers, me]
  );

  return (
    <Wrapper className="post-card-recomment-wrapper">
      <li className="post-card-recomment">
        {/* 작성자의 프로필 이미지 */}
        <Link href={`/profile/${recomment.User._id}`}>
          <a>
            <Avatar
              width={30}
              height={30}
              photo={recomment.User.Photos?.[0].name}
              alt="답글 유저의 프로필 이미지"
              // className="post-card-recomment-avatar"
            />
          </a>
        </Link>
        {/* 답글의 컨텐츠 wrapper */}
        <div className="post-card-recomment-content-wrapper">
          {/* 작성자명, 작성내용 */}
          <div className="post-card-recomment-content">
            <Link href={`/profile/${recomment.User._id}`}>
              <a>
                <span className="post-card-recomment-user-name">
                  {recomment.User.name}
                </span>
              </a>
            </Link>
            <span className="post-card-recomment-text">
              {recomment.content}
            </span>
          </div>

          {/* 답글의 추가 정보 및 버튼 */}
          <div className="post-card-recomment-info">
            <span className="post-card-recomment-created-at">
              {timeFormat(recomment.createdAt)}
            </span>
            <button type="button" className="post-card-recomment-like-button">
              {recomment.CommentLikers.length > 0 && (
                <b>좋아요 {recomment.CommentLikers.length}개</b>
              )}
            </button>
          </div>
        </div>

        {/* 답글 좋아요 버튼 */}
        <div className="post-card-recomment-buttons">
          <button
            type="button"
            className="post-card-recomment-option-button"
            onClick={onOpenMenu}
          >
            <Icon width={16} height={16} icon={ICON.H_OPTION} />
          </button>
          <button
            type="button"
            className="post-card-recomment-heart-button"
            onClick={onClickCommentLikeButton(isLikedRecomment, recomment._id)}
          >
            <Icon
              width={16}
              height={16}
              icon={ICON.HEART}
              $fill={isLikedRecomment}
            />
          </button>
        </div>

        {/* 답글 옵션 메뉴 */}
        {isShowMenu && (
          <Menu $comment onCloseMenu={onCloseMenu}>
            {isMine && (
              <li
                className="menu-list"
                onClick={onRemoveComment(recomment._id)}
              >
                삭제
              </li>
            )}
            <li className="menu-list">신고</li>
            <li className="menu-list">숨기기</li>
          </Menu>
        )}
      </li>
    </Wrapper>
  );
};

export default PostCardRecomment;
