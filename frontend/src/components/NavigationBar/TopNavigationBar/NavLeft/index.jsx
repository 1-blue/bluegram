/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 1024px 이상일 경우 상단 네비게이션 바 좌측 영역
 * 로고 및 깃헙 링크
 */

import React from "react";
import Link from "next/link";

// component
import Icon from "@components/common/Icon";

const LeftMenu = () => {
  return (
    <>
      <Link href="/">
        <Icon shape="logo" width={40} height={40} />
      </Link>
    </>
  );
};

export default LeftMenu;
