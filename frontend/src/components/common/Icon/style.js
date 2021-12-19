import styled from "styled-components";

const iconLocationTable = {
  home: "-10px 0px",
  fillHome: "-30px 0px",
  dm: "-10px -20px",
  fillDm: "-30px -20px",
  add: "-10px -40px",
  fillAdd: "-30px -40px",
  find: "-10px -60px",
  fillFind: "-30px -60px",
  heart: "-10px -80px",
  fillHeart: "-30px -80px",
};

export const Wrapper = styled.i`
  display: inline-block;
  background-image: url(./icon/icon.svg);
  width: 20px;
  height: 20px;
  background-position: ${({ shape }) => iconLocationTable[shape]};
  background-repeat: no-repeat;
  background-size: 60px 200px;
`;
