import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// hook
import useToastMessage from "@src/hooks/useToastMessage";

// type
import { RootState } from "@src/store/configureStore";

// 특정 이벤트 처리 후 메시지들을 토스트 메시지로 렌더링해주는 컴포넌트
const ToastMessage = () => {
  const router = useRouter();
  // 2022/05/22 - 인증관련 각종 이벤트 처리 완료/실패 메시지 - by 1-blue
  const { loginDone, loginError, signUpDone, signUpError } = useSelector(
    ({ auth }: RootState) => auth
  );
  // 2022/05/22 - 로그인 성공/실패 메시지 - by 1-blue
  useToastMessage({ done: loginDone, error: loginError, go: "/" });
  // 2022/05/13 - 회원가입 성공/실패 메시지 - by 1-blue
  useToastMessage({ done: signUpDone, error: signUpError, go: "/login" });

  // 2022/05/22 - 유저관련 각종 이벤트 처리 완료/실패 메시지 - by 1-blue
  const {
    followDone,
    followError,
    unfollowDone,
    unfollowError,
    editAccountDone,
    editAccountError,
    editPasswordDone,
    editPasswordError,
    signOutDone,
    signOutError,
  } = useSelector(({ user }: RootState) => user);
  // 2022/05/22 - 팔로우/언팔로우 - by 1-blue
  useToastMessage({ done: followDone, error: followError });
  useToastMessage({ done: unfollowDone, error: unfollowError });
  // 2022/06/02 - 계정 수정 - by 1-blue
  useToastMessage({
    done: editAccountDone,
    error: editAccountError,
    go: `/profile/${router.query.id}`,
  });
  useToastMessage({
    done: editPasswordDone,
    error: editPasswordError,
    go: `/login`,
  });
  // 2022/06/02 - 회원 탈퇴 - by 1-blue
  useToastMessage({ done: signOutDone, error: signOutError, go: "/" });

  // 2022/05/22 - 게시글관련 각종 이벤트 처리 완료/실패 메시지 - by 1-blue
  const {
    uploadPostDone,
    uploadPostError,
    removePostDone,
    removePostError,
    loadCommentsDone,
    loadCommentsError,
    appendCommentDone,
    appendCommentError,
    removeCommentDone,
    removeCommentError,
    appendLikeToPostDone,
    appendLikeToPostError,
    removeLikeToPostDone,
    removeLikeToPostError,
    appendLikeToCommentDone,
    appendLikeToCommentError,
    removeLikeToCommentDone,
    removeLikeToCommentError,
    appendBookmarkDone,
    appendBookmarkError,
    removeBookmarkDone,
    removeBookmarkError,
  } = useSelector(({ post }: RootState) => post);

  // 2022/05/22 - 게시글 추가/제거  - by 1-blue
  useToastMessage({ done: uploadPostDone, error: uploadPostError });
  useToastMessage({ done: removePostDone, error: removePostError });
  // 2022/05/22 - 댓글 로드  - by 1-blue
  useToastMessage({ done: loadCommentsDone, error: loadCommentsError });
  // 2022/05/22 - 댓글 추가/제거
  useToastMessage({ done: appendCommentDone, error: appendCommentError });
  useToastMessage({ done: removeCommentDone, error: removeCommentError });
  // 2022/05/22 - 게시글에 좋아요 추가/제거  - by 1-blue
  useToastMessage({ done: appendLikeToPostDone, error: appendLikeToPostError });
  useToastMessage({ done: removeLikeToPostDone, error: removeLikeToPostError });
  // 2022/05/22 - 댓글에 좋아요 추가/제거  - by 1-blue
  useToastMessage({
    done: appendLikeToCommentDone,
    error: appendLikeToCommentError,
  });
  useToastMessage({
    done: removeLikeToCommentDone,
    error: removeLikeToCommentError,
  });
  // 2022/05/22 - 북마크 추가/제거 - by 1-blue
  useToastMessage({ done: appendBookmarkDone, error: appendBookmarkError });
  useToastMessage({ done: removeBookmarkDone, error: removeBookmarkError });

  return null;
};

export default ToastMessage;
