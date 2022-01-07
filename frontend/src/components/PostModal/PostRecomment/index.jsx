import React from "react";
import Proptypes from "prop-types";

// components
import Avatar from "@components/common/Avatar";
import Icon from "@components/common/Icon";
import Dialog from "@components/common/Dialog";

// util
import { timeFormat } from "@utils/dateFormat";

// hook
import useOpenClose from "@hooks/useOpenClose";

// styled-component
import { Wrapper } from "./style";

const PostRecomment = ({ recomment, isMineRecomment, isMineRecommentLike, onClickCommentLike, onRemoveComment }) => {
  const [showDialog, onOpenDialog, onCloseDialog] = useOpenClose(false);
  const [showDialogToggle, onOpenDialogToggle, onCloseDialogToggle] = useOpenClose(false);

  return (
    <Wrapper onMouseEnter={onOpenDialogToggle} onMouseLeave={onCloseDialogToggle}>
      <Avatar width={32} height={32} image={recomment.User?.Images[0]} />
      <div className="recomment-container">
        <b className="recomment-username">{recomment.User.name}</b>
        <span className="recomment-content">{recomment.content}</span>
        <div className="recomment-option-list">
          <span className="recomment-time">{timeFormat(recomment.createdAt)}</span>
          {recomment.CommentLikers.length > 0 && (
            <button type="button" className="recomment-like-button">
              좋아요 {recomment.CommentLikers.length}개
            </button>
          )}
          {showDialogToggle && (
            <Icon shape="option" width={16} height={16} fill="gray" hoverfill="black" onClick={onOpenDialog} />
          )}

          {showDialog && (
            <Dialog onClose={onCloseDialog} showDialog={showDialog}>
              {isMineRecomment ? (
                <>
                  <li onClick={onRemoveComment(recomment._id)}>삭제</li>
                  <li>수정</li>
                </>
              ) : (
                <>
                  <li>신고</li>
                </>
              )}
            </Dialog>
          )}
        </div>

        <Icon
          shape="heart"
          width={16}
          height={16}
          fill={isMineRecommentLike ? "var(--heart-color)" : "gray"}
          hoverfill={isMineRecommentLike ? "red" : "black"}
          animation="bounce-in"
          onClick={onClickCommentLike(recomment._id, isMineRecommentLike)}
          $fill={isMineRecommentLike}
        />
      </div>
    </Wrapper>
  );
};

PostRecomment.propTypes = {};

export default PostRecomment;
