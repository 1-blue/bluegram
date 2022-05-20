import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "../common/Icon";
import Photo from "../common/Photo";

// type
import { ICON } from "@src/type";
import type { IPostWithPhotoAndCommentAndLikerAndCount } from "@src/type";

type Props = {
  post: IPostWithPhotoAndCommentAndLikerAndCount;
  $priority: boolean;
};

const PhotoCard = ({ post, $priority }: Props) => {
  const router = useRouter();
  const [isMouseHover, setIsMouseHover] = useState(false);

  // 2021/12/22 - 마우스 enter/leave 이벤트 핸들러 - by 1-blue
  const onMouseEnter = useCallback(() => setIsMouseHover(true), []);
  const onMouseLeave = useCallback(() => setIsMouseHover(false), []);

  // 2022/01/15 - 클릭 시 상세 게시글 페이지(ExplorePage)로 이동 - by 1-blue
  const goExplorePage = useCallback(
    () => router.push(`/explore/${post._id}`),
    [router, post]
  );

  return (
    <Wrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      isMouseHover={isMouseHover}
      onClick={goExplorePage}
    >
      {/* 게시글의 대표 이미지 */}
      <Photo
        photo={post.Photos?.[0]?.name}
        alt="게시글 이미지"
        $priority={$priority}
      />

      {/* 이미지가 2개 이상이라면 이미지 우측 상단에 표시 */}
      {post.Photos && post.Photos.length >= 2 && (
        <aside className="kinds">
          <Icon icon={ICON.DOCUMENT_DUPLICATE} width={30} height={30} />
        </aside>
      )}

      {/* 이미지에 마우스 hover 시 댓글과 좋아요 개수 보여줌 ( pc전용 ) */}
      {isMouseHover && (
        <div className="post-info">
          <div>
            <Icon icon={ICON.HEART} width={24} height={24} />
            <span>{post.PostLikers?.length}</span>
          </div>
          <div>
            <Icon icon={ICON.COMMENT} width={24} height={24} />
            <span>{post.Comments?.length}</span>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default PhotoCard;
