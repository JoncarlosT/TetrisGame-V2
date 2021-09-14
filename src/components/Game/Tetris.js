import React from "react";
import styled from "styled-components";
import Stage from "../Stage/Stage";
import { useStage } from "../../hooks/useStage";
import { usePlayer } from "../../hooks/usePlayer";

const Tetris = () => {
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={stage} />
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledTetris = styled.div``;
