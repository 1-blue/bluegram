import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

// redux + redux-saga
import wrapper from "@store/configureStore";

// css
import "@css/reset.css";
import "@css/common.css";
import "@css/animation.css";

// components
import Scroll from "@components/Scroll";
import TopNavigationBar from "@components/NavigationBar/TopNavigationBar";
import BottomNavigationBar from "@components/NavigationBar/BottomNavigationBar";
import Layout from "@components/Layout";
import Footer from "@components/Footer";

const App = ({ Component, pageProps }) => {
  const [width, setWidth] = useState(0);

  // 2022/01/13 - 창 넓이 구하기 - by 1-blue
  const resize = useCallback(() => setWidth(window.innerWidth), []);
  useEffect(() => {
    setTimeout(resize, 0);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener(resize);
  }, [resize]);

  return (
    <>
      {/* scroll */}
      <Scroll />
      {/* nav*/}
      {width > 1024 ? <TopNavigationBar /> : <BottomNavigationBar />}

      {/* main */}
      <Layout>
        <Component {...pageProps} />
      </Layout>

      {/* footer */}
      <Footer />
    </>
  );
};

App.propTypes = {
  pageProps: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
};

export default wrapper.withRedux(App);
