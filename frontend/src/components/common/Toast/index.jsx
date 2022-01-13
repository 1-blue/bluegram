/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 토스트 메시지
 */

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Proptypes from "prop-types";

// action
import { resetMessageAction } from "@store/actions";

// styled-components
import { Wrapper } from "./style";

const Toast = ({ message, time, success, warning, error }) => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(true);
  const timerId = useRef(null);

  // 2022/01/05 - 토스트 메시지 보여줄 시간 지정 - by 1-blue
  useEffect(() => {
    timerId.current = setTimeout(() => {
      setIsShow(false);
      dispatch(resetMessageAction());
    }, time);

    return () => {
      dispatch(resetMessageAction());
      setIsShow(false);
      clearTimeout(timerId.current);
    };
  }, [time, message]);

  return (
    <>
      {isShow && (
        <Wrapper success={success} warning={warning} error={error}>
          <span>{message}</span>
        </Wrapper>
      )}
    </>
  );
};

Toast.propTypes = {
  message: Proptypes.string.isRequired,
  time: Proptypes.number,
  success: Proptypes.bool,
  warning: Proptypes.bool,
  error: Proptypes.bool,
};

Toast.defaultProps = {
  time: 3000,
};

export default Toast;
