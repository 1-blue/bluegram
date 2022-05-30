import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// action
import { resetMessage } from "@src/store/actions";

type Props = {
  done: null | string;
  error: null | string;
  go?: string;
  excute?: () => void;
};

const useToastMessage = ({ done, error, go, excute }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 2021/12/20 - 로그인 성공 시 메시지와 redirect / 로그인 실패 시 메시지 - by 1-blue
  useEffect(() => {
    if (!done && !error) return;
    if (done) toast.success(done);
    if (error) toast.error(error);

    dispatch(resetMessage());

    if (excute) excute();

    if (go && done) router.push(go);
  }, [done, error, router, dispatch, excute, go]);

  return null;
};

export default useToastMessage;
