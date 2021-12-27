import React from "react";
import Proptypes from "prop-types";

// component
import Avatar from "@components/common/Avatar";

// util
import { timeFormat } from "../../../utils/dateFormat";

// styled-components
import { Wrapper } from "./style";

const PostComment = ({ Comments }) => {
  return (
    <Wrapper>
      {Comments.map(comment => (
        <li key={comment._id}>
          <Avatar width={40} height={40} src={process.env.IMAGE_URL + "/" + comment.User?.Images[0].name} />
          <div className="comment-container">
            <b className="comment-username">{comment.User.name}</b>
            <pre className="comment-content">{comment.content}</pre>
            <div className="comment-option-list">
              <span className="comment-time">{timeFormat(comment.createdAt)}</span>
              <button type="button" className="comment-like-button">
                좋아요 X개
              </button>
              <button type="button" className="comment-recomment-button">
                답글달기
              </button>
            </div>
          </div>
        </li>
      ))}
    </Wrapper>
  );
};

PostComment.propTypes = {
  Comments: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.number,
      content: Proptypes.string,
      UserId: Proptypes.number,
      CommentId: Proptypes.oneOfType([Proptypes.number, Proptypes.node]),
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
    }),
  ).isRequired,
};

export default PostComment;
