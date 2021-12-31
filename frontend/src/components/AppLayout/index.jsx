import React from "react";
import { Outlet } from "react-router-dom";

// components
import NavigationBar from "@components/NavigationBar";

// styled-components
import { Wrapper, MainContainer } from "./style";

const AppLayout = () => {
  return (
    <Wrapper>
      <NavigationBar />

      <MainContainer>
        <Outlet />
      </MainContainer>
    </Wrapper>
  );
};

export default AppLayout;
