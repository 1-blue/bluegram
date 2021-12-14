import { LOAD_TO_ME_REQUEST } from "@store/types";

export function loadToMeAction(data) {
  return {
    type: LOAD_TO_ME_REQUEST,
    data,
  };
}
