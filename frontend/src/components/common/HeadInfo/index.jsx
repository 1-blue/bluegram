import React from "react";
import Head from "next/head";
import Proptypes from "prop-types";

const HeadInfo = ({ title, description, image, url }) => {
  return (
    <Head>
      {/* 현 페이지 제목 */}
      <title>{title}</title>

      {/* 페비콘 */}
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* SEO */}
      <meta name="keyword" content="bluegram, SNS, clone-instagram, 인스타그램 클론, Next.js, React.js" />
      <meta name="description" content={description} />
      <meta name="author" content="1-blue" />

      {/* 카카오톡 미리보기에 제공될 정보 */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={`https://bluegram.cf${url}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="bluegram" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />
    </Head>
  );
};

HeadInfo.propTypes = {
  title: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  description: Proptypes.string.isRequired,
  url: Proptypes.string,
};

HeadInfo.defaultProps = {
  title: "bluegram",
  description: "Next.js를 이용한 인스타그램 클론 사이트 ( 상업용 아님 )",
  image: "/favicon.ico",
  url: "",
};

export default HeadInfo;
