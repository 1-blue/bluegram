import React, { useState, useCallback } from "react";

const useTextarea = (
  initValue: string = ""
): [
  string,
  (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<string>>,
  (ref: React.RefObject<HTMLTextAreaElement>, height?: number) => void
] => {
  const [input, setInput] = useState(initValue);

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value),
    []
  );

  // ref => textarea, height => 최소 높이
  const resize = useCallback(
    (ref: React.RefObject<HTMLTextAreaElement>, height = 1) => {
      if (!ref.current) return;
      if (ref.current.scrollHeight <= height) return;

      setTimeout(() => {
        if (!ref.current) return;

        ref.current.style.height = "1px";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }, 0);
    },
    []
  );

  return [input, onChangeInput, setInput, resize];
};

export default useTextarea;
