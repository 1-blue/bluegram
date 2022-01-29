/**
 * 생성일: 2022/01/19
 * 수정일: 2022/01/24
 * 작성자: 1-blue
 *
 * 유효성 검사 input
 * 본인 정보 수정에서 사용할 때 기본적으로는 유효성 검사를 통과한 값이므로 초기값을 지정할 수 있도록 변경함
 */

// utils
import { validate } from "@utils";

import React, { useCallback, useState, useRef } from "react";

const useValidateInput = (initialValue = "", validateValue = false) => {
  const [value, setValue] = useState(initialValue);
  const [valueValidate, setValueValidate] = useState(validateValue);
  const ref = useRef(null);

  const onChangeValue = useCallback(
    key => e => {
      setValue(e.target.value.trim());
      setValueValidate(validate(key, e.target.value.trim()));
    },
    [ref],
  );

  return [value, onChangeValue, setValue, ref, valueValidate];
};

export default useValidateInput;
