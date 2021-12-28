import React, { useCallback, useState } from "react";
import Proptypes from "prop-types";

// component
import Icon from "@components/common/Icon";

// styled-component
import { Wrapper } from "./style";

const PostCard = ({ post, onOpenModal }) => {
  const [isMouseHover, setIsMouseHover] = useState(false);

  // 2021/12/22 - 마우스 enter/leave 이벤트 핸들러 - by 1-blue
  const onMouseEnter = useCallback(() => setIsMouseHover(true), []);
  const onMouseLeave = useCallback(() => setIsMouseHover(false), []);

  return (
    <Wrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      isMouseHover={isMouseHover}
      onClick={onOpenModal(post._id)}
    >
      <section className="post-image-container">
        <img
          src={process.env.IMAGE_URL + "/" + post.Images[post.Images.length - 1].name}
          alt="유저가 업로드한 이미지"
          className="post-image"
        />
        {isMouseHover && (
          <>
            <div className="post-information">
              <div>
                <Icon shape="fillHeart" width={24} height={24} fill="white" animation="rubber-band" />
                <span>{post.PostLikers.length}</span>
              </div>
              <div>
                <Icon shape="comment" width={24} height={24} fill="white" animation="rubber-band" />
                <span>{post.Comments.length}</span>
              </div>
            </div>

            {post.Images.length === 1 || (
              <figure className="kinds">
                <Icon shape="images" width={24} height={24} fill="white" animation="bounce" />
              </figure>
            )}
          </>
        )}
      </section>
    </Wrapper>
  );
};

PostCard.propTypes = {
  post: Proptypes.shape({
    _id: Proptypes.number.isRequired,
    content: Proptypes.string.isRequired,
    createdAt: Proptypes.string.isRequired,
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
    PostLikers: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
      }),
    ).isRequired,
  }).isRequired,
  onOpenModal: Proptypes.func.isRequired,
};

export default PostCard;
