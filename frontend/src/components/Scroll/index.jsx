/**
 * 생성일: 2022/01/20
 * 수정일: -
 * 작성자: 1-blue
 *
 * 현재 스크롤 Y위치 최상단에 표시해주는 컴포넌트
 */

import React, { useState, useEffect, useCallback } from "react";

// styled-components
import { Wrapper } from "./style";

const Scroll = () => {
  const [currentPositionY, setCurrentPositionY] = useState(0);

  // 현재 스크롤 Y값 %로 구하기
  const scrollEvent = useCallback(() => {
    setCurrentPositionY(
      window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight),
    );
  }, []);

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, [scrollEvent]);

  return <Wrapper currentPositionY={currentPositionY} />;
};

export default Scroll;
