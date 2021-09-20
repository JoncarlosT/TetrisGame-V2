import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Stage from "../Stage/Stage";
import Display from "./Display";
import StartButton from "../Buttons/StartButton";
import { useStage } from "../../hooks/useStage";
import { usePlayer } from "../../hooks/usePlayer";
import { useInterval } from "../../hooks/useInterval";
import { useGameStatus } from "../../hooks/useGameStatus";
import { createStage, checkCollision } from "../../utils/gameHelper";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import db from "../../firebase";

const Tetris = () => {
  const [userName, setUserName] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  const getHighScores = async () => {
    try {
      setHighScores([]);
      const q = query(
        collection(db, "highScores"),
        orderBy("Score", "desc"),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setHighScores((prevArray) => [...prevArray, doc.data()]);
      });
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };

  useEffect(() => {
    getHighScores();
  }, [gameOver]);

  const uploadNewScore = async () => {
    await addDoc(collection(db, "highScores"), {
      Name: userName,
      Score: score,
    });
  };

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 2000);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <HighScoresSide>
          <Display text={`High Scores`} />

          {highScores.map((item, idx) => {
            return <Display key={idx} text={`${item.Name}:  ${item.Score}`} />;
          })}
        </HighScoresSide>

        <Stage stage={stage} />

        <aside>
          {gameOver ? (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />

              {highScores.some((el) => el.Score < score) ? (
                <Display text={"New High Score"} />
              ) : (
                <Display gameOver={gameOver} text="Game Over" />
              )}
            </div>
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}

          {gameOver & highScores.some((el) => el.Score < score) ? (
            <div>
              <form onSubmit={() => uploadNewScore()}>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <UploadButton type="submit">Add New Score</UploadButton>
              </form>
            </div>
          ) : (
            <div>
              <StartButton callBack={startGame} />
            </div>
          )}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 1000px;
  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;

const HighScoresSide = styled.div`
  width: 100%;
  max-width: 200px;
  display: block;
  padding: 0 20px;
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #000;
  font-family: Nunito;
  font-size: 1.2rem;
`;

const UploadButton = styled.button`
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
