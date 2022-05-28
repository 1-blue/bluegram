import React, { useEffect, useCallback, useRef } from "react";

// styled-component
import { Wrapper } from "./style";

type Props = {
  isOpen: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
  [index: string]: any;
};

const Rename = ({ isOpen, onCloseModal, children, ...restProps }: Props) => {
  const modalRef = useRef<null | HTMLDivElement>(null);

  const closeModal = useCallback(
    (e: any) => {
      if (isOpen && modalRef.current === e.target) onCloseModal();
    },
    [modalRef, isOpen, onCloseModal]
  );

  // 2022/01/16 - 영역 외 클릭시 메뉴 닫는 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", closeModal);

    return () => window.removeEventListener("click", closeModal);
  }, [closeModal]);

  return (
    <Wrapper {...restProps} ref={modalRef}>
      {children}
    </Wrapper>
  );
};

export default Rename;
