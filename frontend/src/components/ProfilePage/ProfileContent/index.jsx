import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Proptypes from "prop-types";

// components
import PostCard from "@components/PostCard";
import PostModal from "@components/PostModal";
import Spinner from "@components/common/Spinner";

// action
import { resetPostAction, loadPostsOfUserAction, resetPostsOfUserAction } from "../../../store/actions";

// styled-components
import { Wrapper, PostsWrapper } from "./stytle";

const ProfileContent = ({ role, me, UserId }) => {
  const dispatch = useDispatch();
  const { postsOfUser, loadPostsOfUserLoading, isMorePostsOfUser } = useSelector(state => state.post);
  const [showModal, setShowModal] = useState(false);
  const [openPostId, setOpenPostId] = useState(null);
  const modalRef = useRef(null);

  // 2021/01/04 - params에 따른 각각의 요청 - by 1-blue
  useEffect(() => {
    dispatch(resetPostsOfUserAction());
    switch (role) {
      case "post":
        dispatch(loadPostsOfUserAction({ UserId, lastId: -1, limit: 15 }));
        break;
      case "bookmark":
        break;
      case "tag":
        break;

      default:
        break;
    }
  }, [role, UserId]);

  // 2021/12/21 - 다른 영역 클릭 시 모달 닫기 이벤트 - by 1-blue
  const handleCloseModal = useCallback(
    e => {
      /**
       * 바로 아랫부분 추가한 이유는 게시글 모달창 내부에서 좋아요 같은 아이콘을 누르게 되면 즉시 다른 아이콘으로 변경해 줌
       * ex) heart 아이콘 ==> fillHeart 아이콘
       * 이때 문제가 발생하는 게 누르는 즉시 아이콘을 변경시키므로 이벤트 버블링이 돼서 widdow에서 click 이벤트를 받기 전에
       * 아이콘이 변경되어버림... 그래서 모달창 내부에 있는 태그임에도 불구하고 누르면 영역 외의 태그라고 판단해서 모달창이 닫히기 때문에
       * 아이콘은 특별처리로 눌러도 모달창이 닫히지 않도록 해주는 코드임
       */
      if (e.target.nodeName === "path" || e.target.nodeName === "svg" || e.target.nodeName === "LI") return;

      if (showModal && !modalRef.current?.contains(e.target)) {
        setShowModal(false);
        dispatch(resetPostAction());
      }
    },
    [showModal],
  );

  // 2021/12/21 - 다른 영역 클릭 시 모달 닫기 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", handleCloseModal);

    return () => window.removeEventListener("click", handleCloseModal);
  }, [handleCloseModal]);

  // 2021/12/22 - 클릭 시 모달 열기 및 열린 게시글의 식별자 기록 - by 1-blue
  const onOpenModal = useCallback(
    PostId => () => {
      if (!me._id) return alert("로그인후에 접근이 가능합니다!");
      setShowModal(true);
      setOpenPostId(PostId);
    },
    [me],
  );
  // 2021/12/22 - 클릭 시 모달 닫기 - by 1-blue
  const onCloseModal = useCallback(() => setShowModal(false), [showModal]);

  // 2022/01/02 - 무한스크롤링 이벤트 함수 - by 1-blue
  const scrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 400 &&
      isMorePostsOfUser &&
      !loadPostsOfUserLoading
    ) {
      dispatch(loadPostsOfUserAction({ UserId: UserId, lastId: postsOfUser[postsOfUser.length - 1]._id, limit: 15 }));
    }
  }, [postsOfUser.length, isMorePostsOfUser, loadPostsOfUserLoading]);

  // 2022/01/02 - 무한스크롤링 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);

    return () => window.removeEventListener("scroll", scrollEvent);
  }, [scrollEvent]);

  // 2022/01/03 - 보여줄 컨텐츠 - by 1-blue
  const content = useCallback(
    role => {
      switch (role) {
        case "post":
          return (
            <>
              <PostsWrapper>
                {postsOfUser.map(post => (
                  <PostCard key={post._id} post={post} onOpenModal={onOpenModal} />
                ))}
              </PostsWrapper>

              {loadPostsOfUserLoading && <Spinner page />}

              {showModal && <PostModal PostId={openPostId} onCloseModal={onCloseModal} ref={modalRef} />}
            </>
          );
        case "bookmark":
          return (
            <>
              <h1>내 북마크들</h1>
            </>
          );
        case "tag":
          return (
            <>
              <h1>내 태그된 목록</h1>
            </>
          );

        default:
          return (
            <>
              <h1>잘못된 접근입니다!!</h1>
            </>
          );
      }
    },
    [postsOfUser, loadPostsOfUserLoading, showModal, openPostId, onCloseModal, onOpenModal],
  );

  // 2022/01/07 - 모달창 open 시 외부 스크롤 불가능하도록 지정 - by 1-blue
  useEffect(() => {
    if (showModal) window.document.body.style = "overflow: hidden";
    else window.document.body.style = "overflow: none";
  }, [showModal]);

  return <Wrapper>{content(role)}</Wrapper>;
};

ProfileContent.propTypes = {
  role: Proptypes.string.isRequired,
  me: Proptypes.object.isRequired,
  UserId: Proptypes.string.isRequired,
};

export default ProfileContent;
