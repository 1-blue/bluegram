/**
 * 생성일: 2022/01/19
 * 수정일: -
 * 작성자: 1-blue
 *
 * 유효성 검사 input
 */

// utils
import { validate } from "@utils";

import React, { useCallback, useState, useRef } from "react";

const useValidateInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [valueValidate, setValueValidate] = useState(false);
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
