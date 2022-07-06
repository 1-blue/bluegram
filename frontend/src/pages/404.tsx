import Link from "next/link";
import styled from "styled-components";

import { Bounce } from "@src/styles/animation";

const Wrapper = styled.section`
  & > section {
    margin: 20px 0;
  }

  & > section:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.main};
    font-size: 120px;

    & span:first-child {
      margin-right: 20px;
    }
    & span:last-child {
      margin-left: 20px;
    }
  }
  & > section:last-child {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    & a {
      text-decoration: underline;
      font-size: xx-large;
      margin-top: 60px;
    }
  }
`;

const Svg = styled.svg`
  animation: ${Bounce} 1s infinite ease-in-out;
`;

const NotFoundPage = () => {
  return (
    <Wrapper>
      <section>
        <span>4</span>
        <svg
          version="1.1"
          id="layer"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 40 40"
          xmlSpace="preserve"
          fill="#6069F1"
          width="100px"
          height="100px"
        >
          <g>
            <path d="M14.8,5.1L8.8,33C5.8,29.9,4,25.5,4,21C4,13.6,8.5,7.3,14.8,5.1 M20,0C9,0,0,9.4,0,21c0,8.4,4.7,15.5,11.4,19L20,0L20,0z" />
            <path d="M25.2,5.1C31.5,7.3,36,13.6,36,21c0,4.5-1.8,8.9-4.8,12L25.2,5.1 M20,0l8.6,40C35.3,36.5,40,29.4,40,21C40,9.4,31,0,20,0L20,0z" />
          </g>
        </svg>
        <span>4</span>
      </section>
      <section>
        <h1
          style={{
            whiteSpace: "pre-line",
            textAlign: "center",
            fontSize: "1.4rem",
          }}
        >
          {"찾을 수 없는 페이지 입니다.\n경로를 확인하고 다시 입력해주세요!"}
        </h1>
      </section>
      <section>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ width: "60px", height: "60px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
          />
        </Svg>
        <Link href="/">
          <a>홈 페이지로 이동</a>
        </Link>
      </section>
    </Wrapper>
  );
};

export default NotFoundPage;
