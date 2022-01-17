/**
 * 생성일: 2022/01/15
 * 수정일: -
 * 작성자: 1-blue
 *
 * 상세 게시글 페이지의 이미지 부분
 * 이미지 캐루셀 재활용
 * 최대 이미지 크기 486px로 고정... 더 커지면 비율이 이상해짐
 */

import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import ImageCarousel from "@components/common/ImageCarousel";

const PostCardImage = ({ images }) => {
  return (
    <Wrapper>
      <ImageCarousel speed={500} images={images} />
    </Wrapper>
  );
};

PostCardImage.propTypes = {
  images: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.number,
      name: Proptypes.string,
    }),
  ),
};

export default PostCardImage;
