import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Tetris from "./components/Game/Tetris";

const App = () => {
  return (
    <StyledApp>
      <Tetris />
      <GlobalStyle />
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div``;

const GlobalStyle = createGlobalStyle`
    *{ margin:0 }
`;
