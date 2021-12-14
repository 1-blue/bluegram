//types
import { RESET_MESSAGE, LOAD_TO_ME_REQUEST, LOAD_TO_ME_SUCCESS, LOAD_TO_ME_FAILURE } from "@store/types";

const initState = {
  me: null,

  // 로그인한 유저 정보 로드
  loadToMeLoading: false,
  loadToMeDone: null,
  loadToMeError: null,
};

function authReducer(prevState = initState, action) {
  switch (action.type) {
    case RESET_MESSAGE:
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeDone: null,
        loadToMeError: null,
      };
    case LOAD_TO_ME_REQUEST:
      return {
        ...prevState,
        loadToMeLoading: true,
        loadToMeDone: null,
        loadToMeError: null,
      };
    case LOAD_TO_ME_SUCCESS:
      console.log("LOAD_TO_ME_SUCCESS >> ", action);
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeDone: null,
      };
    case LOAD_TO_ME_FAILURE:
      console.log("LOAD_TO_ME_FAILURE >> ", action);
      return {
        ...prevState,
        loadToMeLoading: false,
        loadToMeError: null,
      };

    default:
      return prevState;
  }
}

export default authReducer;
