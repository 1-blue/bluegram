import React, { useCallback, useEffect, useRef } from "react";
import Proptypes from "prop-types";

import { Wrapper } from "./style";

const Dialog = ({ onClose, children, showDialog }) => {
  const dialogRef = useRef("");

  // 2021/12/27 - 다른 영역 클릭 시 다이어로그 닫기 이벤트 - by 1-blue
  const handleCloseDialog = useCallback(
    e => {
      if (showDialog && !dialogRef.current?.contains(e.target)) {
        onClose();
      }
    },
    [showDialog, dialogRef.current],
  );

  // 2021/12/27 - 다른 영역 클릭 시 다이어로그 닫기 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", handleCloseDialog);

    return () => window.removeEventListener("click", handleCloseDialog);
  }, [handleCloseDialog]);

  return (
    <Wrapper>
      <ul className="dialog-container" ref={dialogRef}>
        {children}
        <li onClick={onClose}>취소</li>
      </ul>
    </Wrapper>
  );
};

Dialog.propTypes = {
  onClose: Proptypes.func.isRequired,
  children: Proptypes.node.isRequired,
  showDialog: Proptypes.bool.isRequired,
};

export default Dialog;
