import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

// store
import wrapper from "@src/store/configureStore";

// style
import GlobalStyles from "@src/styles/GlobalStyles";
import color from "@src/styles/theme";
import "react-toastify/dist/ReactToastify.css";

// component
import Layout from "@src/components/Layout";
import BottomNavigationBar from "@src/components/NavBar/BottomNavBar";
import TopNavigationBar from "@src/components/NavBar/TopNavBar";
import ToastMessage from "@src/components/ToastMessage";
import ScrollProgress from "@src/components/common/ScrollProgress";
import SideButton from "@src/components/SideButton";

function MyApp({ Component, pageProps }: AppProps) {
  // 2022/05/18 - 창 넓이 구하는 변수/메서드들 - by 1-blue
  const [width, setWidth] = useState(0);
  const resize = useCallback(() => setWidth(window.innerWidth), []);
  useEffect(() => {
    setTimeout(resize, 0);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize, setWidth]);

  return (
    <>
      <ThemeProvider theme={{ color }}>
        <GlobalStyles />

        <ScrollProgress />

        {width > 768 ? <TopNavigationBar /> : <BottomNavigationBar />}

        <Layout>
          <Component {...pageProps} />
        </Layout>

        <SideButton width={width} />

        {/* 토스트 메시지 */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="dark"
          closeOnClick
        />

        <ToastMessage />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
