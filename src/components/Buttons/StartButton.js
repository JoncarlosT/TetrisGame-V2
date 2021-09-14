import React from "react";
import styled from "styled-components";

const StartButton = ({ callBack }) => {
  return <StyledStartButton onClick={callBack}>Start Game</StyledStartButton>;
};

export default StartButton;

const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-family: Nunito;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;
