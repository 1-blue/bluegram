// SSR
import wrapper from "@src/store/configureStore";
import { END } from "redux-saga";
import { axiosInstance } from "@src/store/api";

// action
import { userActions } from "@src/store/reducers";

// type
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";

const Notice: NextPage = () => {
  return (
    <>
      <h1>미래에 구현 예정</h1>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      let cookie = context.req?.headers?.cookie;
      cookie = cookie ? cookie : "";
      axiosInstance.defaults.headers.Cookie = cookie;

      // 서버 사이드에서 dispatch할 내용을 적어줌
      store.dispatch(userActions.loadToMeRequest());

      // 밑에 두 개는 REQUEST이후 SUCCESS가 될 때까지 기다려주게 해주는 코드
      store.dispatch(END);
      await store.sagaTask?.toPromise();

      // 위에서 말한대로 axios의 쿠키 제거
      axiosInstance.defaults.headers.Cookie = "";

      return {
        props: {},
      };
    }
  );

export default Notice;
