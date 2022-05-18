import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";

// actions
// import { openCreatePostModalAction } from "@store/actions";

// type
import { ICON } from "@src/type";
import type { UserState } from "@src/store/reducers";

const BottomNavigationBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { me } = useSelector(({ user }: { user: UserState }) => user);

  return (
    <>
      <Wrapper>
        <Link href="/">
          <a className="nav-link">
            <Icon icon={ICON.HOME} width={30} height={30} />
          </a>
        </Link>

        {/* 로그인 상태일 경우 */}
        {me ? (
          <>
            <Link href="/dm">
              <a className="nav-link">
                <Icon icon={ICON.AIRPLANE} width={30} height={30} />
              </a>
            </Link>
            <div className="nav-link">
              <Icon icon={ICON.CIRCLE_ADD} width={30} height={30} />
            </div>
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
                <Icon icon={ICON.LOGIN} width={24} height={24} />
              </a>
            </Link>
            <Link href="/signup">
              <a className="nav-link">
                <Icon icon={ICON.SIGNUP} width={24} height={24} />
              </a>
            </Link>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default BottomNavigationBar;
