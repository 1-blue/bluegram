import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// common-components
import Spinner from "@src/components/common/Spinner";

// components
import PhotoCard from "@src/components/Post/PhotoCard";

// actions
import { loadPostsOfUserRequest } from "@src/store/actions";
import { PostState } from "@src/store/reducers";

type Props = {
  id: number;
};

const ProfilePostImageCard = ({ id }: Props) => {
  const dispatch = useDispatch();
  const { posts, hasMorePosts, loadPostsOfUserLoading } = useSelector(
    ({ post }: { post: PostState }) => post
  );

  // 2022/01/20 - 무한 스크롤링 이벤트 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 400 &&
      hasMorePosts &&
      !loadPostsOfUserLoading
    ) {
      dispatch(
        loadPostsOfUserRequest({
          UserId: id,
          lastId: posts?.[posts.length - 1]._id || -1,
          limit: 15,
        })
      );
    }
  }, [dispatch, posts, hasMorePosts, loadPostsOfUserLoading, id]);

  // 2022/01/20 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  // console.log("posts >> ", posts);

  return (
    <>
      <Wrapper>
        {posts?.map((post) => (
          <PhotoCard key={post._id} post={post} />
        ))}
      </Wrapper>

      {/* {loadPostsOfUserLoading && <Spinner kinds="page" />} */}

      {!hasMorePosts && (
        <span>더 이상 불러올 게시글이 존재하지 않습니다...</span>
      )}
    </>
  );
};

export default ProfilePostImageCard;
