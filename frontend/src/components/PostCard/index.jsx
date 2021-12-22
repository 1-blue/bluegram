// 2021/12/22 - 하나의 게시글 컴포넌트 - by 1-blue

import React, { useCallback, useState } from "react";
import Proptypes from "prop-types";

// component
import Icon from "@components/common/Icon";

// styled-component
import { Wrapper } from "./style";

const PostCard = ({ post }) => {
  const [isMouseHover, setIsMouseHover] = useState(false);

  // 2021/12/22 - 마우스 enter/leave 이벤트 핸들러 - by 1-blue
  const onMouseEnter = useCallback(() => setIsMouseHover(true), []);
  const onMouseLeave = useCallback(() => setIsMouseHover(false), []);

  return (
    <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} isMouseHover={isMouseHover}>
      <section className="post-image-container">
        <img
          src={process.env.IMAGE_URL + "/" + post.Images[0].name}
          alt="유저가 업로드한 이미지"
          className="post-image"
        />
        {isMouseHover && (
          <div className="post-information">
            <div>
              <Icon shape="fillHeart" small />
              <span>{post.Likers.length}</span>
            </div>
            <div>
              <Icon shape="heart" small />
              <span>{post.Comments.length}</span>
            </div>
          </div>
        )}
      </section>
    </Wrapper>
  );
};

PostCard.propTypes = {
  post: Proptypes.shape({
    _id: Proptypes.number.isRequired,
    content: Proptypes.string.isRequired,
    updatedAt: Proptypes.string.isRequired,
    User: Proptypes.shape({
      _id: Proptypes.number,
      name: Proptypes.string,
      Images: Proptypes.arrayOf(
        Proptypes.shape({
          _id: Proptypes.number,
          name: Proptypes.string,
        }),
      ),
    }).isRequired,
    Images: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
        name: Proptypes.string,
      }),
    ).isRequired,
    Comments: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
        content: Proptypes.string,
        UserId: Proptypes.number,
        CommentId: Proptypes.number,
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
    Likers: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
      }),
    ).isRequired,
  }),
};

export default PostCard;
