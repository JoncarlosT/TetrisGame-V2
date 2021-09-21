# TetrisGame-V2

### Background and Overview

TetrisGame-V2 is a recreation of the classic Tetris game released in 1984, as web app.

Website live [here](https://tetrisgame-v2.firebaseapp.com/)

![alt text](https://github.com/JoncarlosT/TetrisGame-V2/blob/main/public/github/tetris-github.gif)

# TetrisGame-V2's Architecture and Technologies:

- This app was solely built using React.js, Firebase, and styled-components

# Features

Collision detection

```javascript
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      if (player.tetromino[y][x] !== 0) {
        if (
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
};
```

FireStore queries

```javascript
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
```

# Credit
