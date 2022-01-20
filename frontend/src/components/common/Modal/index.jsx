/**
 * 생성일: 2022/01/20
 * 수정일: -
 * 작성자: 1-blue
 *
 * 모달 ( 전체 영역을 차지하고, 외부를 클릭해야만 닫힘 )
 * 현재 사이드 바에서 사용 중
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";

// styled-component
import { Wrapper } from "./style";
import { useRef } from "react";
import { useCallback } from "react";

const Modal = ({ isOpenSearch, onCloseModal, children, ...restProps }) => {
  const modalRef = useRef(null);

  const closeModal = useCallback(
    e => {
      if (isOpenSearch && modalRef.current === e.target) onCloseModal();
    },
    [modalRef.current, isOpenSearch, onCloseModal],
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

Modal.propTypes = {
  isOpenSearch: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
