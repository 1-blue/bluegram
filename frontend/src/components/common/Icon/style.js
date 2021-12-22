import styled, { css } from "styled-components";

const bigIconTable = {
  home: "-0px -0px",
  fillHome: "-40px -0px",
  dm: "-80px -0px",
  fillDm: "-120px -0px",
  add: "-0px -40px",
  fillAdd: "-40px -40px",
  compass: "-80px -40px",
  fillCompass: "-120px -40px",
  heart: "-0px -80px",
  fillHeart: "-40px -80px",
  avater: "-80px -80px",
  fillAvatar: "-120px -80px",
  bookmark: "-0px -120px",
  fillBookmark: "-40px -120px",
};
const mediumIconTable = {
  home: "-0px -40px",
  fillHome: "-25px -40px",
  dm: "-50px -40px",
  fillDm: "-75px -40px",
  add: "-0px -65px",
  fillAdd: "-25px -65px",
  compass: "-51px -65px",
  fillCompass: "-75px -65px",
  heart: "-0px -90px",
  fillHeart: "-25px -90px",
  avater: "-50px -90px",
  fillAvatar: "-75px -90px",
  bookmark: "-0px -110px",
  fillBookmark: "-25px -110px",
};
const smallIconTable = {
  home: "-0px -60px",
  fillHome: "-16px -60px",
  dm: "-32px -60px",
  fillDm: "-48px -60px",
  add: "-0px -76px",
  fillAdd: "-16px -76px",
  compass: "-32px -76px",
  fillCompass: "-48px -76px",
  heart: "-0px -92px",
  fillHeart: "-16px -92px",
  avatar: "-32px -92px",
  fillAvatar: "-48px -92px",
  bookmark: "-0px -108px",
  fillBookmark: "-16px -108px",
};

export const Wrapper = styled.i`
  display: inline-block;
  background-image: url("./icon/icon.svg");
  background-repeat: no-repeat;

  ${({ shape, big, medium, small }) => {
    if (big) {
      return css`
        width: 40px;
        height: 40px;
        background-position: ${() => bigIconTable[shape]};
        background-size: 160px 200px;
      `;
    } else if (medium) {
      return css`
        width: 24px;
        height: 24px;
        background-position: ${() => mediumIconTable[shape]};
        background-size: 100px 205px;
      `;
    } else if (small) {
      return css`
        width: 16px;
        height: 16px;
        background-position: ${() => smallIconTable[shape]};
        background-size: 64px 200px;
      `;
    }
  }}
`;
