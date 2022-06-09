import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";

// action
import { openWriteModalRequest } from "@src/store/actions";

// type
import { ICON } from "@src/type";
import type { PostState, UserState } from "@src/store/reducers";

// hook
import useScrollUpDown from "@src/hooks/useScrollUpDown";
import { useRouter } from "next/router";

const BottomNavigationBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector(({ user }: { user: UserState }) => user);
  const { isShowWritePostModal } = useSelector(
    ({ post }: { post: PostState }) => post
  );

  // 2022/01/14 - 게시글 생성 모달 클릭 - by 1-blue
  const onClickWritePostModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(openWriteModalRequest());
    },
    [dispatch]
  );

  // 2022/05/27 - 스크롤 방향 얻기 - by 1-blue
  const [hide] = useScrollUpDown();

  return (
    <>
      <Wrapper hide={hide}>
        <Link href="/">
          <a className="nav-link">
            <Icon
              icon={ICON.HOME}
              width={30}
              height={30}
              $fill={!isShowWritePostModal && router.pathname === "/"}
            />
          </a>
        </Link>

        {/* 로그인 상태일 경우 */}
        {me ? (
          <>
            <Link href="/dm">
              <a className="nav-link">
                <Icon
                  icon={ICON.AIRPLANE}
                  width={30}
                  height={30}
                  $fill={
                    !isShowWritePostModal && router.pathname.startsWith("/dm")
                  }
                />
              </a>
            </Link>
            <button
              type="button"
              className="nav-link"
              onClick={(e) => {
                e.stopPropagation();
                onClickWritePostModal(e);
              }}
            >
              <Icon
                icon={ICON.CIRCLE_ADD}
                width={30}
                height={30}
                $fill={isShowWritePostModal}
              />
            </button>
            <Link href="/notice">
              <a className="nav-link">
                <Icon icon={ICON.HEART} width={30} height={30} />
              </a>
            </Link>
            <Link href={`/profile/${me._id}`}>
              <a className="nav-link">
                <Avatar
                  photo={me.Photos?.[0].name}
                  width={40}
                  height={40}
                  $priority
                />
              </a>
            </Link>
          </>
        ) : (
          // 비로그인 상태일 경우
          <>
            <Link href="/login">
              <a className="nav-link">
                <Icon
                  icon={ICON.LOGIN}
                  width={24}
                  height={24}
                  $fill={router.pathname.startsWith("/login")}
                />
              </a>
            </Link>
            <Link href="/signup">
              <a className="nav-link">
                <Icon
                  icon={ICON.SIGNUP}
                  width={24}
                  height={24}
                  $fill={router.pathname.startsWith("/signup")}
                />
              </a>
            </Link>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default BottomNavigationBar;
