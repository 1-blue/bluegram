import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// styled-components
import { Wrapper } from "./style";

// actions
import { loadPostsOfBookmarkRequest } from "@src/store/actions";

// common-components
import Spinner from "@src/components/common/Spinner";

// components
import PostCard from "@src/components/Post/PostCard";

// type
import type { PostState, UserState } from "@src/store/reducers";

type Props = {
  id: number;
};

const ProfilePostBookmarkCard = ({ id }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector(({ user }: { user: UserState }) => user);
  const {
    detailPosts: posts,
    hasMoreDeatailPosts,
    loadPostsOfBookmarkLoading,
  } = useSelector(({ post }: { post: PostState }) => post);

  useEffect(() => {
    if (me?._id !== +id) {
      toast.error("접근권한이 없습니다.\n프로필 페이지로 이동합니다.");
      router.push(`/profile/${id}`);
    }
  }, [id, me, router]);

  // 2022/01/17 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 400 &&
      hasMoreDeatailPosts &&
      !loadPostsOfBookmarkLoading
    ) {
      dispatch(
        loadPostsOfBookmarkRequest({
          UserId: id,
          lastId: posts?.[posts.length - 1]._id,
          limit: 8,
        })
      );
    }
  }, [dispatch, posts, hasMoreDeatailPosts, loadPostsOfBookmarkLoading, id]);

  // 2022/01/17 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  if (me?._id !== +id) return <h2>접근 권한이 없습니다.</h2>;

  console.log("bookmark >> ", posts);

  return (
    <Wrapper>
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* 게시글 추가 로드 */}
      {loadPostsOfBookmarkLoading && <Spinner kinds="page" />}

      {!hasMoreDeatailPosts && (
        <span
          style={{
            display: "block",
            textAlign: "center",
            margin: "40px 10px 80px",
            fontSize: "16px",
          }}
        >
          더 이상 불러올 게시글이 존재하지 않습니다...
        </span>
      )}
    </Wrapper>
  );
};

export default ProfilePostBookmarkCard;
