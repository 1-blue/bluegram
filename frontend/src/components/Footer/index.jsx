import React from "react";

// styled-components
import { Wrapper } from "./style";

const Footer = () => {
  return (
    <Wrapper>
      <h2 className="footer-title">공부용으로 만든 인스타그램 클론 사이트</h2>
      <ul>
        <li className="footer-link-list">
          <a href="https://github.com/1-blue/bluegram" target="_blank" className="footer-link">
            <b>GitHub</b>
          </a>
        </li>
        <li className="footer-link-list">
          <a href="https://trello.com/b/ACPLTebc/bluegram-v200" target="_blank" className="footer-link">
            <b>Trello</b>
          </a>
        </li>
        <li className="footer-link-list">
          <a href="mailto:1-blue98@naver.com" className="footer-link">
            <b>Email</b>
          </a>
        </li>
        <li className="footer-link-list">
          <a href="https://velog.io/@1-blue/series/bluegram" target="_blank" className="footer-link">
            <b>velog</b>
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Footer;
