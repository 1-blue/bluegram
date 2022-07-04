import { useSelector } from "react-redux";

// common-component
import Spinner from "@src/components/common/Spinner";

// action
import { RootState } from "@src/store/configureStore";

// 특정 이벤트 처리중 페이지 스피너 렌더링 컴포넌트
const GlobalSpinner = () => {
  // 2022/05/22 - 인증관련 각종 이벤트 처리 완료/실패 메시지 - by 1-blue
  const {} = useSelector(({ auth }: RootState) => auth);

  // 2022/05/22 - 유저관련 각종 이벤트 처리 완료/실패 메시지 - by 1-blue
  const {
    editPasswordLoading,
    editAccountLoading,
    signOutLoading,
    loadFollowersLoading,
    loadFollowingsLoading,
  } = useSelector(({ user }: RootState) => user);

  // 2022/05/22 - 게시글관련 각종 이벤트 처리 완료/실패 메시지 - by 1-blue
  const {
    loadCommentsLoading,
    loadRecommentsLoading,
    loadPostsOfBookmarkLoading,
    loadPostsDetailOfUserLoading,
    loadPostsOfUserLoading,
    loadDetailPostsLoading,
    loadPostsOfHashtagLoading,
  } = useSelector(({ post }: RootState) => post);

  //
  const { addRoomLoading } = useSelector(({ chat }: RootState) => chat);

  return (
    <>
      {/* 비밀번호 변경 */}
      {editPasswordLoading && <Spinner kinds="page" />}

      {/* 계정 수정 */}
      {editAccountLoading && <Spinner kinds="page" />}

      {/* 회원 탈퇴 */}
      {signOutLoading && <Spinner kinds="page" />}

      {/* 채팅방 생성 */}
      {addRoomLoading && <Spinner kinds="page" />}

      {/* 댓글 더 불러오기 */}
      {loadCommentsLoading && <Spinner kinds="page" />}

      {/* 특정 댓글의 답글 더 불러오기 */}
      {loadRecommentsLoading && <Spinner kinds="page" />}

      {/* 팔로워 불러오기 */}
      {loadFollowersLoading && <Spinner kinds="page" />}

      {/* 팔로잉 불러오기 */}
      {loadFollowingsLoading && <Spinner kinds="page" />}

      {/* 북마크된 게시글들 추가 로드 */}
      {loadPostsOfBookmarkLoading && <Spinner kinds="page" />}

      {/* 특정 유저의 상세 게시글들 추가 로드 */}
      {loadPostsDetailOfUserLoading && <Spinner kinds="page" />}

      {/* 특정 유저의 게시글들 추가 로드 */}
      {loadPostsOfUserLoading && <Spinner kinds="page" />}

      {/* 상세 게시글들 추가 로드 */}
      {loadDetailPostsLoading && <Spinner kinds="page" />}

      {/* 특정 해시태그의 게시글들 추가 로드 */}
      {loadPostsOfHashtagLoading && <Spinner kinds="page" />}
    </>
  );
};

export default GlobalSpinner;
