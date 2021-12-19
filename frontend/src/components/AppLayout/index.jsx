import React from "react";

// components
import NavigationBar from "@components/NavigationBar";

// styled-components
import { Wrapper, MainContainer } from "./style";

const AppLayout = ({ children }) => {
  return (
    <Wrapper>
      <NavigationBar />

      <MainContainer>{children}</MainContainer>
    </Wrapper>
  );
};

export default AppLayout;
