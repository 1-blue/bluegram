/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 1024px 이상일 경우 상단 네비게이션 바 중간 영역
 * 해시태그 검색 역할
 */

import React, { useCallback } from "react";
import { useRouter } from "next/router";

// hook
import useInput from "@hooks/useInput";

// components
import SearchInput from "@components/common/SearchInput";

const CenterMenu = () => {
  const [text, onChangeText, setText] = useInput("");
  const router = useRouter();

  // 2022/01/13 - 엔터 누르면 해시태그 검색 - by 1-blue
  const onKeyDown = useCallback(
    e => {
      if (e.keyCode !== 13) return;

      router.push(`/hashtag/${encodeURI(text)}`);
      setText("");
    },
    [text],
  );

  return (
    <SearchInput type="search" placeholder="해시태그 검색" value={text} onChange={onChangeText} onKeyDown={onKeyDown} />
  );
};

export default CenterMenu;
