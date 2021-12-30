import React from "react";
import { useDispatch } from "react-redux";

// action
import { resetMessageAction } from "@store/actions";

const useMessage = (done, error) => {
  const dispatch = useDispatch();

  if (!(done || error)) return;
  alert(done || error);

  dispatch(resetMessageAction());
};

export default useMessage;
