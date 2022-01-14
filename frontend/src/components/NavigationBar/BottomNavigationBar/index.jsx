/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 1024px 이하일 경우 하단 네비게이션 바
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@components/common/Icon";
import Avatar from "@components/common/Avatar";

// hooks
import useNavAnimation from "@hooks/useNavAnimation";

// actions
import { openCreatePostModalAction } from "@store/actions";

const BottomNavigationBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { showCreatePostModal } = useSelector(state => state.post);
  const [homeAnimationBallRef, onClickHome] = useNavAnimation();
  const [dmAnimationBallRef, onClickDm] = useNavAnimation();
  const [postAddAnimationBallRef, onClickPostAdd] = useNavAnimation();
  const [noticeAnimationBallRef, onClickNotice] = useNavAnimation();
  const [profileAnimationBallRef, onClickProfile] = useNavAnimation();
  const [loginAnimationBallRef, onClickLogin] = useNavAnimation();
  const [signupAnimationBallRef, onClickSignup] = useNavAnimation();

  return (
    <>
      <Wrapper>
        <Link href="/">
          <a className="nav-link" onClick={onClickHome}>
            <Icon shape="home" width={24} height={24} $fill={!showCreatePostModal && router.pathname === "/"} />
            <div className="animation-ball" ref={homeAnimationBallRef} />
          </a>
        </Link>

        {/* 로그인 상태일 경우 */}
        {me._id ? (
          <>
            <Link href="/dm">
              <a className="nav-link" onClick={onClickDm}>
                <Icon
                  shape="airplane"
                  width={24}
                  height={24}
                  $fill={!showCreatePostModal && router.pathname.startsWith("/dm")}
                />
                <div className="animation-ball" ref={dmAnimationBallRef} />
              </a>
            </Link>
            <div
              className="nav-link"
              onClick={() => {
                onClickPostAdd();
                dispatch(openCreatePostModalAction());
              }}
            >
              <Icon shape="postAdd" width={24} height={24} $fill={showCreatePostModal} />
              <div className="animation-ball" ref={postAddAnimationBallRef} />
            </div>
            <Link href="/notice">
              <a className="nav-link" onClick={onClickNotice}>
                <Icon
                  shape="heart"
                  width={24}
                  height={24}
                  $fill={!showCreatePostModal && router.pathname.startsWith("/notice")}
                />
                <div className="animation-ball" ref={noticeAnimationBallRef} />
              </a>
            </Link>
            <Link href={`/profile/${me._id}`}>
              <a className="nav-link" onClick={onClickProfile}>
                <Avatar width={30} height={30} image={me.Images[0]} alt="유저의 프로필 이미지" />
                <div className="animation-ball" ref={profileAnimationBallRef} />
              </a>
            </Link>
          </>
        ) : (
          // 비로그인 상태일 경우
          <>
            <Link href="/login">
              <a className="nav-link" onClick={onClickLogin}>
                로그인
                <div className="animation-ball" ref={loginAnimationBallRef} />
              </a>
            </Link>
            <Link href="/signup">
              <a className="nav-link" onClick={onClickSignup}>
                회원가입
                <div className="animation-ball" ref={signupAnimationBallRef} />
              </a>
            </Link>
          </>
        )}
      </Wrapper>
    </>
  );
};

BottomNavigationBar.propTypes = {};

export default BottomNavigationBar;
