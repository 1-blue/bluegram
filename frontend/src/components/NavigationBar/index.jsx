import React from "react";

// components
import LeftMenu from "./LeftMenu";
import CenterMenu from "./CenterMenu";
import RightMenu from "./RightMenu";

// styled-components
import { Wrapper, Container } from "./style";

const NavigationBar = () => {
  return (
    <Wrapper>
      <Container>
        <LeftMenu />
        <CenterMenu />
        <RightMenu />
      </Container>
    </Wrapper>
  );
};

export default NavigationBar;
