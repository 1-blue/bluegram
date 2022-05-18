import React, { useEffect } from "react";

// styled-component
import { Wrapper } from "./style";

type Props = {
  onCloseMenu: () => void;
  children: React.ReactNode;
  $profile?: boolean;
  $post?: boolean;
  $comment?: boolean;
};

const Menu = ({ onCloseMenu, children, ...restProps }: Props) => {
  // 2022/01/16 - 영역 외 클릭시 메뉴 닫는 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", onCloseMenu);

    return () => window.removeEventListener("click", onCloseMenu);
  }, [onCloseMenu]);

  return <Wrapper {...restProps}>{children}</Wrapper>;
};

export default Menu;
