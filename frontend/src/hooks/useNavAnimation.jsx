/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 하단 네비게이션 버튼 클릭 시 애니메이션 부여하는 훅
 * ( 정확한 해결법을 몰라서 하나하나 찾다보니 반복이 많아져서 hook으로 분해 )
 */

import { useCallback, useRef } from "react";

const useNavAnimation = () => {
  const ref = useRef(null);

  const onClickButton = useCallback(() => {
    // 이미 실행중이라면 실행하지 않음
    if (ref.current.style.display === "inline-block") return;

    ref.current.style.display = "inline-block";
    ref.current.style.animation = "animation-ball 1s linear forwards";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      ref.current.style = "display:none; animation: none;";
      document.body.style.overflow = "auto";
    }, 1000);
  }, [ref.current]);

  return [ref, onClickButton];
};

export default useNavAnimation;
