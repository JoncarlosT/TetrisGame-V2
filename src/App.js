import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Tetris from "./components/Game/Tetris";
import BG from "./Assets/pexels-felix-mittermeier-1329917.jpg";

const App = () => {
  return (
    <StyledApp>
      <Tetris />
      <GlobalStyle />
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  background-image: url(${BG});
  background-attachment: fixed;
  background-size: cover;
  overflow-x: hidden;
`;

const GlobalStyle = createGlobalStyle`
    *{ margin:0 }
`;
