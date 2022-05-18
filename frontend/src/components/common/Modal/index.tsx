import { forwardRef, useEffect } from "react";
import { Wrapper } from "./style";

type Props = {
  children: React.ReactChild;
  noScroll?: boolean;
  primary?: boolean;
};

// eslint-disable-next-line react/display-name
const Modal = forwardRef<HTMLElement, Props>(
  ({ children, noScroll, primary }, ref) => {
    // 2022/05/01 - 모달창 open 시 스크롤 금지 - by 1-blue
    useEffect(() => {
      if (!noScroll) return;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "auto";
      };
    }, [noScroll]);

    return (
      <Wrapper primary={primary} ref={ref}>
        {children}
      </Wrapper>
    );
  }
);

export default Modal;
